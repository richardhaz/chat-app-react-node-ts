import React from 'react';
import styles from './ConversationSidebar.module.scss';
import { FiSettings } from 'react-icons/fi';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Avatar from '@/assets/images/avatars/avatar.png';
import mockConversations from '@/__mocks__/Conversations';

interface ConversationSidebarProps {
  children: React.ReactNode;
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({ children }) => {
  return (
    <>
      <div className={styles.sidebarContainer}>
        <aside>
          <div className={styles.conversationHeaderWrapper}>
            <div className={styles.conversationHeader}>
              <div className={styles.headerNavTool}>
                <div>
                  <p>Inbox</p>
                  <span>2 new</span>
                </div>
                <button>
                  <FiSettings />
                </button>
              </div>
              <div className={styles.inputWrapper}>
                <input placeholder="Search" />
                <span>
                  <BiSearch />
                </span>
              </div>
            </div>
          </div>
          <div className={styles.conversationList}>
            {mockConversations.map((item) => (
              <Link key={item._id} to={item._id} className={styles.conversationListItem}>
                <div className={styles.userProfile}>
                  <img src={Avatar} alt="user profile picture" />
                  <div>
                    <p>
                      {item.firstName} {item.lastName}
                    </p>
                    <span>online</span>
                  </div>
                  <span className={styles.lastConnection}>1min</span>
                </div>
                <div className={styles.message}>{item.lastMessage}</div>
                <div className={styles.dotNotification}></div>
              </Link>
            ))}
          </div>
        </aside>
        <div className={styles.channelSection}>{children}</div>
      </div>
    </>
  );
};

export default ConversationSidebar;
