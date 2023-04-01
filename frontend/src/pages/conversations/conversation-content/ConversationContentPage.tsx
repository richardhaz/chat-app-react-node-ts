import styles from './ConversationContentPage.module.scss';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import Avatar from '@/assets/images/avatars/avatar.png';

import { ConversationMessages } from '../components';

const ConversationContentPage = () => {
  return (
    <div>
      <div className={styles.conversationContentHeaderWrapper}>
        <div className={styles.conversationContentHeader}>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              <div className={styles.userNames}>
                <img src={Avatar} alt="user-avatar" />
                <div>
                  <p>Leslies Alexander</p>
                  <span>3 minutes ago</span>
                </div>
              </div>
            </div>
            <button className={styles.iconMenuButton}>
              <IoEllipsisVerticalSharp />
            </button>
          </div>
        </div>
      </div>
      <ConversationMessages />
    </div>
  );
};

export default ConversationContentPage;
