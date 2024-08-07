import { SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
// @ts-expect-error When running inside docker container, this import works.
import type { Sentence } from '../../shared/utils/types';
import type { RootState } from '../store';
import StoryPath from './StoryPath';
import { formatDate } from '../utils/formatDate';
import { findStoryPath } from '../utils/findStoryPath';

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
	const [isStoryPathOpen, setIsStoryPathOpen] = useState<boolean>(false);

	const { sentences } = useSelector((state: RootState) => state.sentences);

	const handleAddSentence = (sentence: Sentence) => {
		setParentSentence(sentence);
		setIsModalOpen((prev) => !prev);
	};

	const findStorySoFar = (sentenceId: number, sentences: Sentence[]) => {
		setIsStoryPathOpen(true);
		const path = findStoryPath(sentenceId, sentences);
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
				<p onClick={() => findStorySoFar(sentence.sentence_id, sentences)}>
					{sentence.content}
				</p>
				<button
					className='button-add'
					onClick={() => handleAddSentence(sentence)}
				>
					+
				</button>
			</div>

			{isStoryPathOpen && (
				<StoryPath
					storyPath={storyPath}
					setIsStoryPathOpen={setIsStoryPathOpen}
				/>
			)}
		</>
	);
};

export default SentenceCard;
