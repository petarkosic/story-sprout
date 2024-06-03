import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NewSentence, Sentence } from '../../../shared/utils/types';
import type { AppDispatch, RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { addSentence } from '../features/sentences/sentencesSlice';
import SentenceCard from './SentenceCard';

type SentenceNodeProps = {
	sentence: Sentence;
};

const SentenceNode = ({ sentence }: SentenceNodeProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [parentSentence, setParentSentence] = useState<Sentence | null>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setInputValue('');
	};

	const handleSubmit = () => {
		if (!user) {
			navigate('/auth', { state: { error: 'Login to add a sentence' } });
			return;
		}

		dispatch(
			addSentence({
				story_id: parentSentence?.story_id,
				sentence_id: parentSentence?.sentence_id,
				content: inputValue,
				user_id: user.user_id,
			} as NewSentence)
		);

		handleCloseModal();
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	};

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
				<div className='modal'>
					<div className='modal-content'>
						<span className='close' onClick={() => handleCloseModal()}>
							&times;
						</span>
						<textarea
							maxLength={100}
							value={inputValue}
							onChange={(e) => handleInputChange(e)}
							placeholder='Enter a sentence'
						></textarea>
						<button onClick={handleSubmit}>Submit</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SentenceNode;
