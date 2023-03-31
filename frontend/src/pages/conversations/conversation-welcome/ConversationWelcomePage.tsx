import styles from './ConversationWelcomePage.module.scss';
import WelcomeImage from '@/assets/images/undraw/welcome-chat.svg';

const ConversationWelcome = () => {
  return (
    <div className={styles.conversationContainer}>
      <div>
        <h1>Welcome to Chatty App</h1>
        <p>
          This chat app was developed as part of my projects, I hope you liked it, it was fun to
          build this app!!. @TheGuilty
        </p>
      </div>
      <img src={WelcomeImage} alt="welcome-to-chat-image" />
    </div>
  );
};

export default ConversationWelcome;
