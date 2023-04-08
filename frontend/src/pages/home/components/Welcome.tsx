import styles from './Welcome.module.scss';
import WelcomeImage from '@/assets/images/undraw/welcome-chat.svg';

const Welcome = () => {
  return (
    <div className={styles.homeContainer}>
      <div>
        <h1>Chatty App</h1>
        <p>
          This chat app was developed as part of my projects, I hope you like it as much as I do.
        </p>
        <span>@TheGuiltyDeveloper</span>
      </div>
      <img src={WelcomeImage} alt="welcome-to-chat-image" />
    </div>
  );
};

export default Welcome;
