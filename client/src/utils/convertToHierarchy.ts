import { Sentence } from '../../../shared/utils/types';

// // Function to convert flat data to hierarchical structure
export async function convertToHierarchy(
	data: Sentence[]
): Promise<Sentence[]> {
	const buildTree = (node: Sentence) => {
		const childNodes = data.filter(
			(item) => item.parent_sentence_id === node.sentence_id
		);

		if (childNodes.length > 0) {
			node.children = childNodes.map((child) => buildTree(child));
		}

		return node;
	};

	const rootNodes: Sentence[] = data.filter(
		(item) => item.parent_sentence_id === null
	);

	const result: Sentence[] = [];

	if (rootNodes.length === 1) {
		result.push(await buildTree(rootNodes[0]));
	} else {
		throw new Error('Multiple root nodes found!');
	}

	return result;
}
