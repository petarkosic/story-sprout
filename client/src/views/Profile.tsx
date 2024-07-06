import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { changeNickname, checkNickname } from '../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [nickname, setNickname] = useState<string>('');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);

	const { isNicknameAvailable } = useSelector(
		(state: RootState) => state.users
	);

	const debouncedNickname = useDebounce<string>(nickname, 1000);

	useEffect(() => {
		if (nickname) {
			dispatch(checkNickname(nickname));
		}
	}, [debouncedNickname]);

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

	return (
		<div className='profile-container'>
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
	);
};

export default Profile;
