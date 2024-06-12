import { useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { getStories } from '../features/stories/storiesSlice';
import type { Story } from '../../../shared/utils/types';
import StarRating from '../components/StarRating';

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const stories: Story[] = useSelector(
		(state: RootState) => state.stories.stories
	);

	useEffect(() => {
		dispatch(getStories());
	}, [dispatch]);

	function handleClick(story: Story) {
		navigate(`story/${story.story_id}`, { state: { story } });
	}

	return (
		<>
			<p className='action'>Choose a story to contribute to</p>
			<div className='container'>
				{stories?.map((story) => (
					<div
						key={story.story_id}
						className='story-card'
						onClick={() => handleClick(story)}
					>
						<p className='story-headline'>{story.story_headline}</p>
						<div className='story-author'>
							<p>
								{story?.first_name} {story?.last_name?.[0] + '.'}
							</p>
							<StarRating rating={story.rating || 0} />
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
