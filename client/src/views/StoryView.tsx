import { useEffect, useState } from 'react';
import { useLocation, ScrollRestoration } from 'react-router-dom';
import SentenceNode from '../components/SentenceNode';
import type { Sentence } from '../../../shared/utils/types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { getSentences } from '../features/sentences/sentencesSlice';
import AddNewSentenceModal from '../components/AddNewSentenceModal';
import Rating from '../components/Rating';
import StarRating from '../components/StarRating';
import { checkIfUserRatedStory } from '../features/stories/storiesSlice';

function StoryView() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { state } = useLocation();

	const dispatch = useDispatch<AppDispatch>();
	const { sentences, status } = useSelector(
		(state: RootState) => state.sentences
	);

	const user = useSelector((state: RootState) => state.auth.user);
	const hasAlreadyRated = useSelector(
		(state: RootState) => state.stories.hasAlreadyRated
	);

	if (user) {
		dispatch(
			checkIfUserRatedStory({
				story_id: state?.story?.story_id || '',
				user_id: user?.user_id || '',
			})
		);
	}

	useEffect(() => {
		if (state?.story?.story_id) {
			dispatch(getSentences({ story_id: state.story.story_id }));
		}
	}, [state.story.story_id, dispatch]);

	return (
		<>
			<ScrollRestoration />
			<div className='story-container'>
				<div className='story-details'>
					<h1>{state.story.story_headline}</h1>
					<p className='story-author-name'>
						{state.story?.first_name} {state.story?.last_name?.[0] + '.'}
					</p>
					<div className='story-info'>
						<div className='story-stats'>
							<p>
								{state.story.number_of_contributions}{' '}
								{state.story.number_of_contributions === 1
									? 'Contribution'
									: 'Contributions'}
							</p>

							{(!user || user.user_id == state.story.user_id) && (
								<StarRating rating={state.story.average_rating} />
							)}

							{user && hasAlreadyRated && (
								<StarRating rating={state.story.average_rating} />
							)}

							{user && !hasAlreadyRated && (
								<Rating storyId={state.story.story_id} />
							)}
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
