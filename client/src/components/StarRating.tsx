type StarRatingProps = {
	rating: number;
};

const StarRating = ({ rating }: StarRatingProps) => {
	const validRatings = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0];
	const closestRating = validRatings.includes(rating)
		? rating
		: Math.max(...validRatings.filter((r) => r <= rating));

	return (
		<div className='stars'>
			<div
				className={`star icon-star star-rating-${closestRating
					.toString()
					.replace('.', '-')}`}
			></div>
		</div>
	);
};

export default StarRating;
