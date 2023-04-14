import styles from './UsersListNavigationDrawer.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { setUsersListNavigationDrawer } from '@/redux/app/app.slice';
import ChatListLoading from '@/shared/layouts/chat-list/ChatListLoading';

const UsersListNavigationDrawer = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector(state => state.auth);
  const { usersListNavigationDrawer } = useAppSelector(state => state.app);
  const { onlineUsers } = useAppSelector(state => state.socket);
  const { users } = useAppSelector(state => state.user);

  const renderResult = () => {
    const allOnlineUsers = onlineUsers.length - 1;

    return (
      <>
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
          <div className={styles.usersListWrapper}>
            {onlineUsers
              .filter(u => u.profile._id !== loggedIn?._id)
              .map(item => (
                <Link
                  key={item.profile._id}
                  to={`/chat/${item.profile._id}`}
                  className={styles.usersListItem}
                  onClick={() => dispatch(setUsersListNavigationDrawer(!usersListNavigationDrawer))}
                >
                  <div className={styles.userProfileWrapper}>
                    <div className={styles.avatarWrapperDrawer}>
                      <img src={item.profile.avatar} alt="user profile picture" />
                      <div className={styles.dotNotificationWrapper}></div>
                    </div>
                    <div>
                      <p>{item.profile.displayName}</p>
                      <span>online</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <Drawer
        anchor="right"
        PaperProps={{ sx: { backgroundColor: '#1a1a1a' } }}
        open={usersListNavigationDrawer}
        onClose={() => dispatch(setUsersListNavigationDrawer(false))}
      >
        {renderResult()}
      </Drawer>
    </div>
  );
};

export default UsersListNavigationDrawer;
