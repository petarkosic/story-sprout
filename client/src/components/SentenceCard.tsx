import { SetStateAction } from 'react';
import { Sentence } from '../../../shared/utils/types';

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

	return (
		<div className='sentence'>
			<div className='sentence-info'>
				<p>
					{sentence?.first_name || ''} {sentence?.last_name?.[0] + '.' || ''}
				</p>
				<span className='sentence-date'>{formatDate(sentence.created_at)}</span>
			</div>
			<p>{sentence.content}</p>
			<button
				className='button-add'
				onClick={() => handleAddSentence(sentence)}
			>
				+
			</button>
		</div>
	);
};

export default SentenceCard;
