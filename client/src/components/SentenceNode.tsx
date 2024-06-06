import { useState } from 'react';
import type { Sentence } from '../../../shared/utils/types';
import SentenceCard from './SentenceCard';
import AddNewSentenceModal from './AddNewSentenceModal';

type SentenceNodeProps = {
	sentence: Sentence;
};

const SentenceNode = ({ sentence }: SentenceNodeProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [parentSentence, setParentSentence] = useState<Sentence | null>(null);

	return (
		<div key={sentence.sentence_id} className='sentence-wrapper'>
			<SentenceCard
				sentence={sentence}
				setParentSentence={setParentSentence}
				setIsModalOpen={setIsModalOpen}
			/>
			{sentence.children?.map((child: Sentence) => (
				<SentenceNode key={child.sentence_id} sentence={child} />
			))}
			{isModalOpen && (
				<AddNewSentenceModal
					setIsModalOpen={setIsModalOpen}
					parentSentence={parentSentence}
				/>
			)}
		</div>
	);
};

export default SentenceNode;
