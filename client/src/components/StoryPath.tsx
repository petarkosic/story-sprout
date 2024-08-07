import { SetStateAction } from 'react';
// @ts-expect-error When running inside docker container, this import works.
import type { Sentence } from '../../shared/utils/types';

type StoryPathProps = {
	storyPath: Sentence[];
	setIsStoryPathOpen: React.Dispatch<SetStateAction<boolean>>;
};

const StoryPath = ({ storyPath, setIsStoryPathOpen }: StoryPathProps) => {
	return (
		<div className='story-path-wrapper'>
			{storyPath.length > 0 && (
				<div className='story-path-content'>
					<span
						className='button-close'
						onClick={() => setIsStoryPathOpen(false)}
					>
						&times;
					</span>
					<div className='story-path'>
						<h2>Story Path</h2>
						<ul>
							{storyPath.map((sentence) => (
								<li key={sentence.sentence_id}>{sentence.content}</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default StoryPath;
