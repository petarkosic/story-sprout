import { useNavigate } from 'react-router-dom';
import { TUserRated } from '../../../shared/utils/types';
import StarRating from './StarRating';

const UserRated = ({ rated }: { rated: TUserRated[] }) => {
	const navigate = useNavigate();

	function handleClick(storyId: number) {
		const story = rated.find((story) => story.story_id === storyId);

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
