import { SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store';
import { addSentence } from '../features/sentences/sentencesSlice';
// @ts-expect-error When running inside docker container, this import works.
import type { NewSentence, Sentence } from '../../shared/utils/types';
import { clearState } from '../features/auth/authSlice';

type AddNewSentenceModalProps = {
	setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
	parentSentence?: Sentence | null;
	storyId?: number;
};

const AddNewSentenceModal = ({
	setIsModalOpen,
	parentSentence,
	storyId,
}: AddNewSentenceModalProps) => {
	const [inputValue, setInputValue] = useState<string>('');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);

	const handleSubmit = () => {
		if (!user) {
			dispatch(clearState());
			navigate('/auth', { state: { error: 'Login to add a sentence' } });
			return;
		}

		dispatch(
			addSentence({
				story_id: parentSentence?.story_id || storyId,
				sentence_id: parentSentence?.sentence_id || null,
				content: inputValue,
				user_id: user.user_id,
			} as NewSentence)
		);

		handleCloseModal();
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setInputValue('');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	};

	return (
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
	);
};

export default AddNewSentenceModal;
