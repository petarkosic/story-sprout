import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// @ts-expect-error When running inside docker container, this import works.
import type { Story, TUserRated } from '../../shared/utils/types';
import type { RootState } from '../store';
import StarRating from './StarRating';

const UserRated = ({ rated }: { rated: TUserRated[] }) => {
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
		<div className='rated-container'>
			{rated?.map((story) => (
				<div
					key={story.story_id}
					className='user-rated'
					onClick={() => handleClick(story.story_id)}
				>
					<p>{story.story_headline}</p>
					<StarRating rating={story.rating} />
				</div>
			))}
		</div>
	);
};

export default UserRated;
