import styles from './RecentMessagesEmpty.module.scss';
import EmptyInboxImage from '@/assets/images/undraw/be-friends.svg';

const RecentMessagesEmpty = () => {
  return (
    <div className={styles.conversationListEmpty}>
      <p>There&apos;s nothing here!</p>
      <span>You don&apos;t have any conversation yet, try to make some friends</span>
      <img src={EmptyInboxImage} width={150} />
    </div>
  );
};

export default RecentMessagesEmpty;
