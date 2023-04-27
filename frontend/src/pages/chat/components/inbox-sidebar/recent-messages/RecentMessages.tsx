import React, { useEffect } from 'react';
import styles from './RecentMessages.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import moment from 'moment';
import { ConversationThunk } from '@/redux/conversation/conversation.thunk';
import { UpdateLastMessageStatusDto } from '@/shared/models';

const RecentMessages: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allMyConversations } = useAppSelector(state => state.conversation);
  const { loggedIn } = useAppSelector(state => state.auth);
  const { onlineUsers } = useAppSelector(state => state.socket);
  const params = useParams();

  const handleUpdateConversationLastMessageStatus = () => {
    const payload: UpdateLastMessageStatusDto = {
      member1: `${loggedIn?._id}`,
      member2: `${params.id}`,
      messageStatus: 'seen'
    };
    dispatch(ConversationThunk.updateLastMessageStatus(payload));
  };

  useEffect(() => {
    if (params.id && loggedIn && allMyConversations.data.length > 0) {
      handleUpdateConversationLastMessageStatus();
    }
  }, []);

  return (
    <div className={styles.conversationList}>
      {allMyConversations.data.map(item => (
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
                {onlineUsers.filter(u => u.profile._id === item.contact._id).length > 0
                  ? 'online'
                  : moment(item.updatedAt).fromNow()}
              </span>
            </div>
            <span className={styles.newMessage}>New</span>
          </div>
          <p className={styles.message}>
            {item.senderId === loggedIn?._id && 'You: '}
            {item.lastMessage}
          </p>
          {item.contact._id === params.id && <div className={styles.dotNotification}></div>}
        </Link>
      ))}
    </div>
  );
};

export default RecentMessages;
