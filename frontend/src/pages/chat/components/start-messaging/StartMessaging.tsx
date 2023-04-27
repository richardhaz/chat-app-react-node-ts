import EmptyInboxImage from '@/assets/images/undraw/chat-start.svg';
import styles from './StartMessaging.module.scss';

const StartMessaging = () => {
  return (
    <div className={styles.startMessagingContainer}>
      <div>
        <h2>Start Messaging</h2>
        <p>Choose one user from the online users list and start meeting new people</p>
      </div>
      <img src={EmptyInboxImage} alt="empty-chat-image" />
    </div>
  );
};

export default StartMessaging;
