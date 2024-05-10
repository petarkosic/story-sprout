import { useState } from 'react';
import { type Sentence } from '../utils/types';

const SentenceNode = ({ sentence }: { sentence: Sentence }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState('');

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setInputValue(''); // Reset input value when modal is closed
	};

	const handleSubmit = () => {
		console.log('Submitted:', inputValue);
		handleCloseModal();
	};

	const handleAddSentence = () => {
		setIsModalOpen((prev) => !prev);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<div
			className='sentence-wrapper'
			style={{
				marginLeft: '50px',
				borderLeft: '1px solid gray',
			}}
		>
			<div className='sentence'>
				<p>{sentence.content}</p>
				<button className='button-add' onClick={() => handleAddSentence()}>
					+
				</button>
			</div>
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
						<button onClick={() => handleSubmit()}>Submit</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SentenceNode;
