import React, { useEffect } from 'react';
import styles from './InboxSidebar.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/redux/useTypedRedux';
import moment from 'moment';

const InboxSidebar: React.FC = () => {
  const { allMyConversations } = useAppSelector((state) => state.conversation);
  const { me } = useAppSelector((state) => state.user);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const params = useParams();

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
        {allMyConversations.data.map((item) => (
          <Link
            key={item._id}
            to={item.contact._id}
            className={`${styles.conversationListItem} ${
              item.contact._id === params.id && styles.conversationListItemSelected
            }`}
          >
            <div className={styles.userProfile}>
              <img src={item.contact.avatar} alt="user profile picture" />
              <div>
                <p>
                  {item.contact.firstName} {item.contact.lastName}
                </p>
                <span>
                  {onlineUsers.filter((u) => u.profile._id === item.contact._id).length > 0
                    ? 'online'
                    : moment(item.updatedAt).fromNow()}
                </span>
              </div>
              <span className={styles.lastConnection}>1min</span>
            </div>
            <p className={styles.message}>
              {item.senderId === me.data?._id && 'You: '}
              {item.lastMessage}
            </p>
            {item.contact._id === params.id && <div className={styles.dotNotification}></div>}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default InboxSidebar;
