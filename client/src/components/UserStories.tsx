import { TUserStories } from '../../../shared/utils/types';

export const UserStories = ({ stories }: { stories: TUserStories[] }) => {
	return (
		<div className='container'>
			{stories?.map((story: TUserStories) => (
				<div key={story.story_id} className='story-card user-story'>
					{story.story_headline}
				</div>
			))}
		</div>
	);
};
