import styles from './UsersListNavigationDrawer.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
/* import mockusers from '@/__mocks__/Conversations'; */
import Drawer from '@mui/material/Drawer';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { setUsersListNavigationDrawer } from '@/redux/app/app.slice';
import { APP_NAME } from '@/config';
import { Skeleton } from '@mui/material';

const UsersListNavigationDrawer = () => {
  const { usersListNavigationDrawer } = useAppSelector((state) => state.app);
  const { users } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const renderResult = () => {
    const isLoading = false;

    // TODO: fix online dot color not working

    return (
      <>
        <div className={styles.usersHeaderWrapper}>
          <div className={styles.usersHeader}>
            <div className={styles.headerNavTool}>
              <p>Chat</p>
              <span>{`104 users connected`}</span>
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
          <UserListNavigationDrawerLoading />
        ) : (
          <div className={styles.usersListWrapper}>
            {users.data.map((item) => (
              <Link
                key={item._id}
                to={`/${APP_NAME}/conversations/${item._id}`}
                className={styles.usersListItem}
                onClick={() => dispatch(setUsersListNavigationDrawer(!usersListNavigationDrawer))}
              >
                <div className={styles.userProfileWrapper}>
                  <div className={styles.avatarWrapperDrawer}>
                    <img src={item.avatar} alt="user profile picture" />
                    <div className={styles.dotNotificationWrapper}></div>
                  </div>
                  <div>
                    <p>
                      {item.firstName} {item.lastName}
                    </p>
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

const UserListNavigationDrawerLoading = () => {
  return (
    <div className={styles.usersList}>
      {Array.from(new Array(6)).map((item, idx) => (
        <div key={idx} className={styles.usersListItem}>
          <div className={styles.userProfile}>
            <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} variant="circular" width={45} height={45} />
            <div>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900', marginBottom: '10px' }}
                variant="rectangular"
                width={140}
                height={18}
              />
              <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={140} height={12} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
