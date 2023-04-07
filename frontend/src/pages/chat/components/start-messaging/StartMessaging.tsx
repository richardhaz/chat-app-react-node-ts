import StartMessagingImage from '@/assets/images/undraw/be-friends.svg';
import styles from './StartMessaging.module.scss';

const StartMessaging = () => {
  return (
    <div className={styles.startMessagingContainer}>
      <div>
        <h2>Start Messaging</h2>
        <p>You haven&apos;t started a conversation yet</p>
      </div>
      <img src={StartMessagingImage} alt="empty-chat-image" />
    </div>
  );
};

export default StartMessaging;
