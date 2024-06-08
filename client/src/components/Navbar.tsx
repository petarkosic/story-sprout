import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearState, logoutUser } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../store';
import { addNewStory } from '../features/stories/storiesSlice';

const Navbar = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);

	const handleLogin = () => {
		navigate('/auth');
	};

	const handleLoguot = () => {
		dispatch(clearState());
		dispatch(logoutUser());
		navigate('/auth');
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setInputValue('');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = () => {
		if (!user) {
			navigate('/auth', { state: { error: 'Login to add a sentence' } });
			return;
		}

		dispatch(
			addNewStory({
				story_headline: inputValue,
				user_id: user.user_id,
			})
		);

		handleCloseModal();
	};

	return (
		<>
			<div className='navbar-container'>
				<p onClick={() => navigate('/')}>logo</p>
				{user?.first_name ? (
					<div className='user-info'>
						<div>
							{user?.first_name} {user?.last_name[0] + '.'}
						</div>
						<div
							className='add-story-button'
							onClick={() => setIsModalOpen(true)}
						>
							+
						</div>

						{isModalOpen && (
							<div className='modal'>
								<div className='modal-content modal-content-add'>
									<span className='close' onClick={() => handleCloseModal()}>
										&times;
									</span>
									<form>
										<textarea
											name='story-headline'
											value={inputValue}
											onChange={(e) => handleInputChange(e)}
											placeholder='Create new story'
										></textarea>
										<button type='submit' onClick={handleSubmit}>
											Submit
										</button>
									</form>
								</div>
							</div>
						)}

						<button className='button-logout' onClick={handleLoguot}>
							logout
						</button>
					</div>
				) : (
					<button className='button-login' onClick={handleLogin}>
						login
					</button>
				)}
			</div>
		</>
	);
};

export default Navbar;
