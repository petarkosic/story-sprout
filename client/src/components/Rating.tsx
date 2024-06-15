import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { rateStory } from '../features/stories/storiesSlice';

function Rating({ storyId }: { storyId: string }) {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);

	const handleClick = (index: number) => {
		setRating(index);
	};

	useEffect(() => {
		if (rating > 0) {
			dispatch(rateStory({ story_id: storyId, user_id: user.user_id, rating }));
		}
	}, [rating, dispatch, storyId, user.user_id]);

	return (
		<div>
			<p className='rate-action'>Rate a story</p>
			{[...Array(5)].map((_, index) => {
				index += 1;
				return (
					<span
						key={index}
						onClick={() => handleClick(index)}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(0)}
					>
						{hover >= index || rating >= index ? (
							<span style={{ color: '#00ccff' }}>&#9733;</span>
						) : (
							<span style={{ color: '#00ccff' }}>&#9734;</span>
						)}
					</span>
				);
			})}
		</div>
	);
}

export default Rating;
