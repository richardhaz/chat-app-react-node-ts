import React from 'react';
import styles from './ConversationSidebar.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import mockConversations from '@/__mocks__/Conversations';
import { Skeleton } from '@mui/material';

const ConversationSidebar: React.FC = () => {
  const isLoading = false;

  return (
    <aside>
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
      {isLoading ? (
        <ConversationSidebarContentLoading />
      ) : (
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
      )}
    </aside>
  );
};

export default ConversationSidebar;

export const ConversationSidebarContentLoading = () => {
  return (
    <div className={styles.conversationList}>
      {Array.from(new Array(6)).map((item, idx) => (
        <div key={idx} className={styles.conversationListItem}>
          <div className={styles.userProfile}>
            <Skeleton
              animation="wave"
              sx={{ bgcolor: 'grey.900' }}
              variant="circular"
              width={45}
              height={45}
            />
            <div>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900', marginBottom: '10px' }}
                variant="rectangular"
                width={120}
                height={16}
              />
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900' }}
                variant="rectangular"
                width={120}
                height={12}
              />
            </div>
            <div>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900', marginBottom: '25px' }}
                variant="rectangular"
                width={16}
                height={8}
              />
            </div>
          </div>
          <Skeleton
            animation="wave"
            sx={{ bgcolor: 'grey.900' }}
            variant="rectangular"
            width={180}
            height={12}
          />
        </div>
      ))}
    </div>
  );
};
