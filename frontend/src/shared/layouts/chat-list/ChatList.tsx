import styles from './ChatList.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import ChatListLoading from './ChatListLoading';
import { useEffect, useState } from 'react';
import { SocketMessaggeData, SocketUserModel } from '@/shared/models';
import { ioSocket } from '@/shared/utils';
import { EVENTS } from '@/sockets';

const ChatList: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const { loggedIn } = useAppSelector((state) => state.auth);
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const [socketMessage, setSocketMessage] = useState<SocketMessaggeData | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<SocketUserModel[]>([]);

  const allOnlineUsers = onlineUsers.length - 1;

  const handleGetAllMessages = (id: string) => {
    setSocketMessage(null);
    // if condition to prevent refetching the same user info if its selected one more time in the chat list
    if (params.id && params.id !== id) {
      dispatch(UserThunk.getUserById(id));
    }
  };

  const handleSearch = (searchTerm: string) => {
    // remove my user from search
    const onlineUsersWithoutMe = onlineUsers.filter((res) => res.profile._id !== loggedIn?._id);

    // search user
    const result = onlineUsersWithoutMe.filter((res) =>
      res.profile.displayName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    setFilteredUsers(result);
  };

  const messageNotificationBelongsYou = (id: string) => {
    return (
      socketMessage &&
      loggedIn &&
      [socketMessage.senderId, socketMessage.receiverId].includes(loggedIn._id) &&
      socketMessage.senderId === id
    );
  };

  // listen incomming messages
  useEffect(() => {
    if (loggedIn) {
      const socket = ioSocket();
      socket.on(EVENTS.GET_SENT_MESSAGE, (data: SocketMessaggeData) => {
        setSocketMessage(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (socketMessage && loggedIn) {
      if (
        [socketMessage.senderId, socketMessage.receiverId].includes(loggedIn._id) &&
        socketMessage.senderId === params.id &&
        socketMessage.receiverId === loggedIn._id
      ) {
        setSocketMessage(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketMessage]);

  return (
    <div className={styles.usersListContainer}>
      <div className={styles.usersHeaderWrapper}>
        <div className={styles.usersHeader}>
          <div className={styles.headerNavTool}>
            <p>Chat</p>
            <span>{`${allOnlineUsers} users connected`}</span>
          </div>
          <div className={styles.inputWrapper}>
            <input placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
            <span>
              <BiSearch />
            </span>
          </div>
        </div>
      </div>
      {filteredUsers.length > 0 ? (
        <div>
          <div className={styles.usersList}>
            {filteredUsers.map((item) => (
              <Link
                key={item.profile._id}
                to={`/chat/${item.profile._id}`}
                className={styles.usersListItem}
                onClick={() => handleGetAllMessages(item.profile._id)}
              >
                <div className={styles.userProfile}>
                  <div className={styles.avatarWrapper}>
                    <img src={item.profile.avatar} alt="user profile picture" />
                    <div className={styles.dotNotification}></div>
                  </div>

                  <div>
                    <p>{item.profile.displayName}</p>
                    <span>online</span>
                  </div>
                  {messageNotificationBelongsYou(item.profile._id) && (
                    <div className={styles.newMessageNotification}>!</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {users.loading ? (
            <ChatListLoading />
          ) : (
            <div className={styles.usersList}>
              {onlineUsers
                .filter((u) => u.profile._id !== loggedIn?._id)
                .map((item) => (
                  <Link
                    key={item.profile._id}
                    to={`/chat/${item.profile._id}`}
                    className={styles.usersListItem}
                    onClick={() => handleGetAllMessages(item.profile._id)}
                  >
                    <div className={styles.userProfile}>
                      <div className={styles.avatarWrapper}>
                        <img src={item.profile.avatar} alt="user profile picture" />
                        <div className={styles.dotNotification}></div>
                      </div>

                      <div>
                        <p>{item.profile.displayName}</p>
                        <span>online</span>
                      </div>
                      {messageNotificationBelongsYou(item.profile._id) && (
                        <div className={styles.newMessageNotification}>!</div>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatList;
