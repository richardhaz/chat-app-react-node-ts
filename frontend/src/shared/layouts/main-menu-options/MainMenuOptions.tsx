import React from 'react';
import styles from './MainMenuOptions.module.scss';
import { Link } from 'react-router-dom';
import {
  RiGlobalLine,
  RiGroupLine,
  RiMessengerLine,
  RiSettings2Line,
  RiUser3Line
} from 'react-icons/ri';
import { useAppSelector } from '@/redux/useTypedRedux';

const routes = [
  {
    path: '/global-chat',
    name: 'Global Chat',
    icon: <RiGlobalLine />
  },
  {
    path: '/chat',
    name: 'Inbox',
    icon: <RiMessengerLine />
  },
  {
    path: '/me',
    name: 'My Account',
    icon: <RiUser3Line />
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <RiSettings2Line />
  },
  {
    path: '/friends',
    name: 'Friends',
    icon: <RiGroupLine />
  }
];

const MainMenuOptions: React.FC = () => {
  const { loggedIn } = useAppSelector((state) => state.auth);

  return (
    <aside className={styles.mainMenuOptionsContainer}>
      <div className={styles.menuOptionsHeaderWrapper}>
        <div className={styles.menuHeader}>
          <img src={loggedIn?.avatar} />
          <p>
            {loggedIn?.firstName} {loggedIn?.lastName}{' '}
          </p>
        </div>
      </div>
      <div className={styles.menuList}>
        {routes.map((item, idx) => (
          <Link key={idx} to={item.path} className={styles.menuListItem}>
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default MainMenuOptions;
