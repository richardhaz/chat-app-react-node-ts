import React from 'react';
import styles from './AllUsersSidebar.module.scss';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import mockuserss from '@/__mocks__/Conversations';
import { useAppSelector } from '@/redux/useTypedRedux';

const AllUsersSidebar: React.FC = () => {
  const { users } = useAppSelector((state) => state.user);

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

      <div className={styles.usersList}>
        {users.data.map((item) => (
          <Link key={item._id} to={item._id} className={styles.usersListItem}>
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
    </div>
  );
};

export default AllUsersSidebar;
