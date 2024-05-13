import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SentenceNode from '../components/SentenceNode';
import { type Sentence } from '../../../shared/utils/types';

function StoryView() {
	const [data, setData] = useState<Sentence[] | null>(null);

	const { state } = useLocation();

	useEffect(() => {
		async function fetcnSentences() {
			fetch(`http://localhost:5000/api/v1/stories/${state.story.story_id}`)
				.then((res) => res.json())
				.then((sentences) => convertToHierarchy(sentences.sentences))
				.then((data) => setData(data))
				.catch((err) => console.error(err));
		}

		fetcnSentences();
	}, [state.story.story_id, data?.length]);

	// Function to convert flat data to hierarchical structure
	async function convertToHierarchy(data: Sentence[]): Promise<Sentence[]> {
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

	return (
		<>
			<div className='story-container'>
				<div className='story-details'>
					<h1>{state.story.story_headline}</h1>
					<div className='story-info'>
						<p>Story details</p>
						<div className='story-stats'>
							<p>Number of contributions: </p>
							<p>Rating: {state.story.rating || 'Not rated yet'}</p>
						</div>
					</div>
				</div>
				<div className='story-actions'>
					{data?.map((sentence) => (
						<SentenceNode
							key={sentence.sentence_id}
							sentence={sentence}
							setData={setData}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default StoryView;
