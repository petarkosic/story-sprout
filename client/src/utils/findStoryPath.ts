import { Sentence } from '../../../shared/utils/types';

export const findSentenceById = (
	sentences: Sentence[],
	sentenceId: number
): Sentence | null => {
	for (const sentence of sentences) {
		if (sentence.sentence_id === sentenceId) return sentence;

		if (sentence.children) {
			const found = findSentenceById(sentence.children, sentenceId);

			if (found) return found;
		}
	}
	return null;
};

export const findStoryPath = (
	sentenceId: number,
	sentences: Sentence[]
): Sentence[] => {
	const path = [];
	let currentSentence = findSentenceById(sentences, sentenceId);

	while (currentSentence) {
		path.unshift(currentSentence);
		currentSentence = currentSentence.parent_sentence_id
			? findSentenceById(sentences, currentSentence.parent_sentence_id)
			: null;
	}

	return path;
};
