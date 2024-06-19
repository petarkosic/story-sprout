import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { clearError, rateStory } from '../features/stories/storiesSlice';
import { useNavigate } from 'react-router-dom';

function Rating({ storyId }: { storyId: string }) {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);
	const { error } = useSelector((state: RootState) => state.stories);

	const handleClick = (index: number) => {
		if (!user) {
			navigate('/auth');
		}
		setRating(index);
	};

	setTimeout(() => {
		dispatch(clearError());
	}, 5000);

	useEffect(() => {
		if (rating > 0 && user) {
			dispatch(
				rateStory({ story_id: storyId, user_id: user?.user_id, rating })
			);
		}
	}, [rating, dispatch, storyId, user?.user_id]);

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
			{error && <p>{error}</p>}
		</div>
	);
}

export default Rating;
