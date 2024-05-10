import { type Sentence } from '../utils/types';

const SentenceNode = ({ sentence }: { sentence: Sentence }) => {
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
				<button className='button-add' onClick={() => console.log(sentence)}>
					+
				</button>
			</div>
			{sentence.children?.map((child: Sentence) => (
				<SentenceNode key={child.sentence_id} sentence={child} />
			))}
		</div>
	);
};

export default SentenceNode;
