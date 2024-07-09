import { TUserSentences } from '../../../shared/utils/types';

export const UserSentences = ({
	sentences,
}: {
	sentences: TUserSentences[];
}) => {
	return (
		<div className='container'>
			{sentences?.map((sentence: TUserSentences) => (
				<div key={sentence.sentence_id} className='story-card user-sentence'>
					{sentence.content}
				</div>
			))}
		</div>
	);
};
