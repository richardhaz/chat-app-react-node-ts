import EmptyInboxImage from '@/assets/images/undraw/chat-start.svg';
import styles from './StartMessaging.module.scss';

const StartMessaging = () => {
  return (
    <div className={styles.startMessagingContainer}>
      <div>
        <h2>Start Messaging</h2>
        <p>You haven&apos;t started a conversation yet</p>
      </div>
      <img src={EmptyInboxImage} alt="empty-chat-image" />
    </div>
  );
};

export default StartMessaging;
