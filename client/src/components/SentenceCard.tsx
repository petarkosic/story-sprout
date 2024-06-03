import { SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import type { Sentence } from '../../../shared/utils/types';
import type { RootState } from '../store';

type SentenceNodeProps = {
	sentence: Sentence;
	setParentSentence: React.Dispatch<SetStateAction<Sentence | null>>;
	setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
};

const SentenceCard = ({
	sentence,
	setParentSentence,
	setIsModalOpen,
}: SentenceNodeProps) => {
	const [storyPath, setStoryPath] = useState<Sentence[]>([]);

	const { sentences } = useSelector((state: RootState) => state.sentences);

	const handleAddSentence = (sentence: Sentence) => {
		setParentSentence(sentence);
		setIsModalOpen((prev) => !prev);
	};

	const formatDate = (dateString: Date) => {
		const date = new Date(dateString);
		const day = String(date.getUTCDate()).padStart(2, '0');
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const year = date.getUTCFullYear();
		return `${day}. ${month}. ${year}.`;
	};

	const findSentenceById = (
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

	const findStoryPath = (sentenceId: number, sentences: Sentence[]) => {
		const path = [];
		let currentSentence = findSentenceById(sentences, sentenceId);

		while (currentSentence) {
			path.unshift(currentSentence);
			currentSentence = currentSentence.parent_sentence_id
				? findSentenceById(sentences, currentSentence.parent_sentence_id)
				: null;
		}

		setStoryPath(path);
	};

	return (
		<>
			<div className='sentence'>
				<div className='sentence-info'>
					<p>
						{sentence?.first_name || ''} {sentence?.last_name?.[0] + '.' || ''}
					</p>
					<span className='sentence-date'>
						{formatDate(sentence.created_at)}
					</span>
				</div>
				<p onClick={() => findStoryPath(sentence.sentence_id, sentences)}>
					{sentence.content}
				</p>
				<button
					className='button-add'
					onClick={() => handleAddSentence(sentence)}
				>
					+
				</button>
			</div>

			{storyPath.length > 0 && (
				<div className='story-path'>
					<h2>Story Path</h2>
					<ol>
						{storyPath.map((sentence) => (
							<li key={sentence.sentence_id}>{sentence.content}</li>
						))}
					</ol>
				</div>
			)}
		</>
	);
};

export default SentenceCard;
