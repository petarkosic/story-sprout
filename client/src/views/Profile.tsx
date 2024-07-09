import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import {
	changeNickname,
	checkNickname,
	getUsersSentences,
	getUsersStories,
} from '../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { UserStories } from '../components/UserStories';
import { UserSentences } from '../components/UserSentences';

const Profile = () => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [nickname, setNickname] = useState<string>('');
	const [activeTab, setActiveTab] = useState<string>('stories');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);
	const { stories, sentences } = useSelector((state: RootState) => state.users);

	const { isNicknameAvailable } = useSelector(
		(state: RootState) => state.users
	);

	const debouncedNickname = useDebounce<string>(nickname, 1000);

	useEffect(() => {
		if (nickname) {
			dispatch(checkNickname(nickname));
		}
	}, [debouncedNickname]);

	useEffect(() => {
		if (user?.user_id) {
			dispatch(getUsersStories(user.user_id));
			dispatch(getUsersSentences(user.user_id));
		}
	}, [user, dispatch]);

	function handleEditNickName() {
		setIsEditing(!isEditing);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		dispatch(
			changeNickname({
				user_id: user?.user_id,
				nickname,
			})
		);

		setTimeout(() => {
			navigate(0);
		}, 1000);
	}

	function handleTabChange(tab: string) {
		setIsEditing(false);
		setActiveTab(tab);

		if (tab === 'stories') {
			dispatch(getUsersStories(user?.user_id));
		}

		if (tab === 'sentences') {
			dispatch(getUsersSentences(user?.user_id));
		}
	}

	return (
		<div className='profile-container'>
			<div className='profile-header'>
				<h1>
					{user?.first_name} {user?.last_name}
				</h1>
				<div className='edit-nickname'>
					{!isEditing ? (
						<>
							<p>{user?.nickname}</p>
							<button
								className='edit-button'
								onClick={() => handleEditNickName()}
							>
								&#9998;
							</button>
						</>
					) : (
						<form onSubmit={handleSubmit}>
							<input
								type='text'
								id='nickname'
								name='nickname'
								className={isNicknameAvailable ? 'unavailable' : 'available'}
								value={nickname}
								placeholder={user?.nickname}
								onChange={(e) => setNickname(e.target.value)}
							/>
							{isNicknameAvailable ? (
								<span className='check-if-available'>&#x2715;</span>
							) : (
								<span className='check-if-available'>&#x2713;</span>
							)}
							<button type='button' onClick={() => setIsEditing(false)}>
								&#8249;
							</button>
							<button type='submit' disabled={isNicknameAvailable}>
								&#8250;
							</button>
						</form>
					)}
				</div>
			</div>

			<div className='profile-content'>
				<div
					className={`profile-stories ${
						activeTab == 'stories' ? 'active' : ''
					}`}
					onClick={() => handleTabChange('stories')}
				>
					Stories
				</div>

				<div
					className={`profile-sentences ${
						activeTab == 'sentences' ? 'active' : ''
					}`}
					onClick={() => handleTabChange('sentences')}
				>
					Sentences
				</div>
			</div>

			{activeTab == 'stories' ? (
				<UserStories stories={stories} />
			) : (
				<UserSentences sentences={sentences} />
			)}
		</div>
	);
};

export default Profile;
