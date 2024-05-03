import { useLocation } from 'react-router-dom';

function StoryView() {
	const { state } = useLocation();

	return (
		<div>
			<p>{state.story.story_headline}</p>
			<p>Story ID: {state.story.story_id}</p>
		</div>
	);
}

export default StoryView;
