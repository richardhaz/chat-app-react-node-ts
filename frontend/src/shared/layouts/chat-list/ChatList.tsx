import styles from './ChatList.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import ChatListLoading from './ChatListLoading';

const ChatList: React.FC = () => {
  const { users } = useAppSelector((state) => state.user);
  const { loggedIn } = useAppSelector((state) => state.auth);
  const { onlineUsers } = useAppSelector((state) => state.socket);

  const dispatch = useAppDispatch();
  const params = useParams();

  const handleGetAllMessages = (id: string) => {
    // if condition to prevent refetching the same user info if its selected one more time in the chat list
    if (params.id && params.id !== id) {
      dispatch(UserThunk.getUserById(id));
    }
  };

  const allOnlineUsers = onlineUsers.length - 1;

  const newMessage = false;

  return (
    <div className={styles.usersListContainer}>
      <div className={styles.usersHeaderWrapper}>
        <div className={styles.usersHeader}>
          <div className={styles.headerNavTool}>
            <p>Chat</p>
            <span>{`${allOnlineUsers} users connected`}</span>
          </div>
          <div className={styles.inputWrapper}>
            <input placeholder="Search" />
            <span>
              <BiSearch />
            </span>
          </div>
        </div>
      </div>

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
                    <p>
                      {item.profile.firstName} {item.profile.lastName}
                    </p>
                    <span>online</span>
                  </div>
                  {newMessage && <div className={styles.newMessageNotification}>2</div>}
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
