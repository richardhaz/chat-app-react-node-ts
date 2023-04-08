import styles from './InboxSidebar.module.scss';
import { BiSearch } from 'react-icons/bi';
import { useAppSelector } from '@/redux/useTypedRedux';
import { RecentMessages } from './recent-messages';
import RecentMessagesEmpty from './recent-messages/RecentMessagesEmpty';
import { CircularProgress } from '@mui/material';

const InboxSidebar: React.FC = () => {
  const { allMyConversations } = useAppSelector((state) => state.conversation);

  return (
    <aside className={styles.inboxContainer}>
      <div className={styles.conversationHeaderWrapper}>
        <div className={styles.conversationHeader}>
          <div className={styles.headerNavTool}>
            <p>Inbox</p>
            <span>{`2 new message(s)`}</span>
          </div>
          <div className={styles.inputWrapper}>
            <input placeholder="Search" />
            <span>
              <BiSearch />
            </span>
          </div>
        </div>
      </div>
      {allMyConversations.loading ? (
        <CircularProgress />
      ) : allMyConversations.data.length === 0 ? (
        <RecentMessagesEmpty />
      ) : (
        <RecentMessages />
      )}
    </aside>
  );
};

export default InboxSidebar;
