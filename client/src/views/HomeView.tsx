import { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

type Story = {
	story_id: number;
	story_headline: string;
	rating: number;
};

function App() {
	const [stories, setStories] = useState<Story[] | undefined>([]);

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchStories() {
			fetch('http://localhost:5000/api/v1/stories')
				.then((res) => res.json())
				.then((stories) => setStories(stories.stories))
				.catch((err) => console.error(err));
		}

		fetchStories();
	}, []);

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
					</div>
				))}
			</div>
		</>
	);
}

export default App;
