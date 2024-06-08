import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SentenceNode from '../components/SentenceNode';
import type { Sentence } from '../../../shared/utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getSentences } from '../features/sentences/sentencesSlice';
import AddNewSentenceModal from '../components/AddNewSentenceModal';

function StoryView() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { state } = useLocation();

	const dispatch = useDispatch<AppDispatch>();
	const { sentences, status } = useSelector(
		(state: RootState) => state.sentences
	);

	useEffect(() => {
		if (state?.story?.story_id) {
			dispatch(getSentences({ story_id: state.story.story_id }));
		}
	}, [state.story.story_id, dispatch]);

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
				{status === 'loading' && <p>Loading...</p>}
				<div className='story-actions'>
					{sentences.length === 0 && (
						<button
							className='button-add no-sentences'
							onClick={() => setIsModalOpen(true)}
						>
							+
						</button>
					)}

					{isModalOpen && (
						<AddNewSentenceModal
							setIsModalOpen={setIsModalOpen}
							parentSentence={null}
							storyId={state.story.story_id}
						/>
					)}

					{sentences?.map((sentence: Sentence) => (
						<SentenceNode key={sentence.sentence_id} sentence={sentence} />
					))}
				</div>
			</div>
		</>
	);
}

export default StoryView;
