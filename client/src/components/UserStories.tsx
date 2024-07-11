import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { Story, TUserStories } from '../../../shared/utils/types';
import type { RootState } from '../store';

export const UserStories = ({ stories }: { stories: TUserStories[] }) => {
	const navigate = useNavigate();

	const storiesList: Story[] = useSelector(
		(state: RootState) => state.stories.stories
	);

	function handleClick(storyId: number) {
		const story = storiesList.find((story) => story.story_id === storyId);

		if (!story) return;

		navigate(`/story/${story.story_id}`, { state: { story } });
	}

	return (
		<div className='container'>
			{stories?.map((story: TUserStories) => (
				<div
					key={story.story_id}
					className='story-card user-story'
					onClick={() => handleClick(story.story_id)}
				>
					<p>{story.story_headline}</p>
				</div>
			))}
		</div>
	);
};
