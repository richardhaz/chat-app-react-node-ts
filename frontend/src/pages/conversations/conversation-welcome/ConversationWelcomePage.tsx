import styles from './ConversationWelcomePage.module.scss';
import WelcomeImage from '@/assets/images/undraw/welcome-chat.svg';

const ConversationWelcome = () => {
  return (
    <div className={styles.conversationContainer}>
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

export default ConversationWelcome;
