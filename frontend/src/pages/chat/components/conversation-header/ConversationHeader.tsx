import { useAppSelector } from '@/redux/useTypedRedux';
import styles from './ConversationHeader.module.scss';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import ConversationHeaderLoading from './ConversationHeaderLoading';

const ConversationHeader = () => {
  const { userById } = useAppSelector((state) => state.user);
  return (
    <div className={styles.conversationContentHeader}>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfo}>
          {userById.loading ? (
            <ConversationHeaderLoading />
          ) : (
            <div className={styles.userNames}>
              <img src={userById.data?.avatar} alt="user avatar" />
              <div>
                <p>
                  {userById.data?.firstName} {userById.data?.lastName}
                </p>
                {/* TODO: update minutes ago with socket io */}
                <span>3 minutes ago</span>
              </div>
            </div>
          )}
        </div>
        <button className={styles.iconMenuButton}>
          <IoEllipsisVerticalSharp />
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;
