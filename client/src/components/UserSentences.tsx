import { formatDate } from '../utils/formatDate';
// @ts-expect-error When running inside docker container, this import works.
import type { TUserSentences } from '../../shared/utils/types';

export const UserSentences = ({
	sentences,
}: {
	sentences: TUserSentences[];
}) => {
	return (
		<div className='sentences-container'>
			{sentences?.map((sentence: TUserSentences) => (
				<div key={sentence.sentence_id} className='user-sentence'>
					<p>{sentence.story_headline}</p>
					<span>{sentence.content}</span>
					<p>{formatDate(sentence.created_at)}</p>
				</div>
			))}
		</div>
	);
};
