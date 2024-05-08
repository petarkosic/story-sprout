import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Sentence = {
	sentence_id: number;
	story_id: number;
	parent_sentence_id: number;
	content: string;
	created_at: Date;
	story_headline: string;
	rating: number;
};

function StoryView() {
	const [sentences, setSentences] = useState<Sentence[] | undefined>([]);

	const { state } = useLocation();

	useEffect(() => {
		async function fetcnSentences() {
			fetch(`http://localhost:5000/api/v1/stories/${state.story.story_id}`)
				.then((res) => res.json())
				.then((sentences) => setSentences(sentences.sentences))
				.catch((err) => console.error(err));
		}

		fetcnSentences();
	}, [state.story.story_id]);

	return (
		<>
			<div className='story-container'>
				<div className='story-details'>
					<h1>{state.story.story_headline}</h1>
					<div className='story-info'>
						<p>Story details</p>
						<div className='story-stats'>
							<p>Number of contributions: </p>
							<p>Rating: {state.story.rating || 'Not rated yet'}</p>
						</div>
					</div>
				</div>
				<div className='story-actions'>
					{sentences?.map((sentence) => (
						<div key={sentence.sentence_id}>
							<p key={sentence.sentence_id}>{sentence.content}</p>
							<span>Sentence ID: {sentence.sentence_id}</span>
							<span>
								Parent Sentence ID: {sentence.parent_sentence_id || 'None'}
							</span>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default StoryView;
