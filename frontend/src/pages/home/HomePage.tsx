import { useEffect } from 'react';
import styles from './HomePage.module.scss';
import WelcomeImage from '@/assets/images/undraw/welcome-chat.svg';
import { useAppDispatch } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import { getPersistedToken } from '@/shared/utils';

const HomePage = () => {
  const dispatch = useAppDispatch();

  // load all users
  useEffect(() => {
    if (getPersistedToken()) {
      dispatch(UserThunk.getAllUsers());
    }
  }, [dispatch]);

  // get profile
  useEffect(() => {
    if (getPersistedToken()) {
      dispatch(UserThunk.getProfile());
    }
  }, [dispatch]);

  return (
    <div className={styles.homeContainer}>
      <div>
        <h1>Welcome to Chatty App</h1>
        <p>
          This chat app was developed as part of my projects, I hope you like it as much as I do.
        </p>
        <span>@TheGuiltyDev</span>
      </div>
      <img src={WelcomeImage} alt="welcome-to-chat-image" />
    </div>
  );
};

export default HomePage;
