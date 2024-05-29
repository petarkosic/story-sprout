import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../features/auth/authSlice';
import type { Sentence } from '../../../shared/utils/types';
import type { AppDispatch } from '../store';

type SentenceNodeProps = {
	sentence: Sentence;
	setData: React.Dispatch<React.SetStateAction<Sentence[] | null>>;
};

const SentenceNode = ({ sentence, setData }: SentenceNodeProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [parentSentence, setParentSentence] = useState<Sentence | null>(null);
	const dispatch = useDispatch<AppDispatch>();

	async function addSentence() {
		try {
			const response = await fetch('http://localhost:5000/api/v1/stories', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
				body: JSON.stringify({
					story_id: parentSentence?.story_id,
					sentence_id: parentSentence?.sentence_id,
					content: inputValue,
				}),
			});

			if (response.status === 401) {
				await dispatch(refreshToken());
				await addSentence();
			}

			const data = await response.json();

			setData((prevData) => [...prevData!, data]);
		} catch (error) {
			console.error(error);
		}
	}

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setInputValue('');
	};

	const handleSubmit = () => {
		addSentence();
		handleCloseModal();
	};

	const handleAddSentence = (sentence: Sentence) => {
		setParentSentence(sentence);
		setIsModalOpen((prev) => !prev);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<div key={sentence.sentence_id} className='sentence-wrapper'>
			<div className='sentence'>
				<p>{sentence.content}</p>
				<button
					className='button-add'
					onClick={() => handleAddSentence(sentence)}
				>
					+
				</button>
			</div>
			{sentence.children?.map((child: Sentence) => (
				<SentenceNode
					key={child.sentence_id}
					sentence={child}
					setData={setData}
				/>
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
