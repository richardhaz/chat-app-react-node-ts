import EmptyContentImage from '@/assets/images/undraw/empty-content.svg';
import styles from './ConversationMessageEmpty.module.scss';

const ConversationMessageEmpty = () => {
  return (
    <div className={styles.emptyConversationContainer}>
      <div>
        <h2>There is no messages to show</h2>
        <p>You haven&apos;t started a conversation yet</p>
      </div>
      <img src={EmptyContentImage} alt="empty-chat-image" />
    </div>
  );
};

export default ConversationMessageEmpty;
