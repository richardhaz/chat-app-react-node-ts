import styles from './UsersListNavigationDrawer.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
/* import mockusers from '@/__mocks__/Conversations'; */
import Drawer from '@mui/material/Drawer';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { setUsersListNavigationDrawer } from '@/redux/app/app.slice';
import { APP_NAME } from '@/config';

const UsersListNavigationDrawer = () => {
  const { usersListNavigationDrawer } = useAppSelector((state) => state.app);
  const { users } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const renderResult = () => {
    return (
      <>
        <div className={styles.usersHeaderWrapper}>
          <div className={styles.usersHeader}>
            <div className={styles.headerNavTool}>
              <p>Users</p>
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
        <div className={styles.usersList}>
          {users.data.map((item) => (
            <Link
              key={item._id}
              to={`/${APP_NAME}/conversations/${item._id}`}
              className={styles.usersListItem}
              onClick={() => dispatch(setUsersListNavigationDrawer(!usersListNavigationDrawer))}
            >
              <div className={styles.userProfile}>
                <img src={item.avatar} alt="user profile picture" />
                <div>
                  <p>
                    {item.firstName} {item.lastName}
                  </p>
                  <span>online</span>
                </div>
              </div>
              <div className={styles.dotNotification}></div>
            </Link>
          ))}
        </div>
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
