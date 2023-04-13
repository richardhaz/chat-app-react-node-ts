import { useAppSelector } from '@/redux/useTypedRedux';
import styles from './GlobalConversationHeader.module.scss';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import ConversationHeaderLoading from './GlobalConversationHeaderLoading';

const GlobalConversationHeader = () => {
  return (
    <div className={styles.conversationContentHeader}>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfo}>Welcome to the global chat</div>
        {/* <button className={styles.iconMenuButton}>
          <IoEllipsisVerticalSharp />
        </button> */}
      </div>
    </div>
  );
};

export default GlobalConversationHeader;
