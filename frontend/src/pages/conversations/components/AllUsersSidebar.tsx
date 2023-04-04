import styles from './AllUsersSidebar.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { Skeleton } from '@mui/material';
import { UserThunk } from '@/redux/user/user.thunk';

const AllUsersSidebar: React.FC = () => {
  const { users } = useAppSelector((state) => state.user);
  const { onlineUsers } = useAppSelector((state) => state.socket);

  console.log('rtk', onlineUsers);

  const dispatch = useAppDispatch();
  const params = useParams();

  const handleGetUserById = (id: string) => {
    // if condition to prevent refetching the same user info if its selected one more time in the chat list
    if (params.id && params.id !== id) {
      dispatch(UserThunk.getUserById(id));
    }
  };

  return (
    <div className={styles.usersListContainer}>
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

      {users.loading ? (
        <UsersListLoading />
      ) : (
        <div className={styles.usersList}>
          {onlineUsers.map((item) => (
            <Link
              key={item.profile._id}
              to={item.profile._id}
              className={styles.usersListItem}
              onClick={() => handleGetUserById(item.profile._id)}
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsersSidebar;

const UsersListLoading = () => {
  return (
    <div className={styles.usersList}>
      {Array.from(new Array(8)).map((item, idx) => (
        <div key={idx} className={styles.usersListItem}>
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
                width={140}
                height={18}
              />
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900' }}
                variant="rectangular"
                width={140}
                height={12}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
