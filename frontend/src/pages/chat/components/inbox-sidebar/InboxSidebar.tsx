import React from 'react';
import styles from './InboxSidebar.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import mockConversations from '@/__mocks__/Conversations';

const InboxSidebar: React.FC = () => {
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
      <div className={styles.conversationList}>
        {mockConversations.map((item) => (
          <Link key={item._id} to={item._id} className={styles.conversationListItem}>
            <div className={styles.userProfile}>
              <img src={item.avatar} alt="user profile picture" />
              <div>
                <p>
                  {item.firstName} {item.lastName}
                </p>
                <span>online</span>
              </div>
              <span className={styles.lastConnection}>1min</span>
            </div>
            <p className={styles.message}>{item.lastMessage}</p>
            <div className={styles.dotNotification}></div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default InboxSidebar;
