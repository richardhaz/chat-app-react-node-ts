import React from 'react';
import styles from './MainMenuOptions.module.scss';
import { Link } from 'react-router-dom';
import {
  RiGlobalLine,
  RiGroupLine,
  RiMessengerLine,
  RiSettings2Line,
  RiUser3Line,
  RiBugLine,
  RiInformationLine
} from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { ConversationThunk } from '@/redux/conversation/conversation.thunk';
import { S3Avatar } from '@/shared/utils';

const routes = [
  {
    path: '/global-chat',
    name: 'Global Chat',
    icon: <RiGlobalLine />
  },
  {
    path: '/chat',
    name: 'Single Chat',
    icon: <RiMessengerLine />
  },
  {
    path: '/me',
    name: 'My Account',
    icon: <RiUser3Line />
  },
  {
    path: '/about',
    name: 'About',
    icon: <RiInformationLine />
  }
  /*  {
    path: '/settings',
    name: 'Settings',
    icon: <RiSettings2Line />
  },
  {
    path: '/friends',
    name: 'Friends',
    icon: <RiInformationLine />
  }, */
  /*   {
    path: '/bug-report',
    name: 'Bug Report',
    icon: <RiBugLine />
  },
  {
    path: '/about',
    name: 'About',
    icon: <RiGroupLine />
  } */
];

const MainMenuOptions: React.FC = () => {
  const { loggedIn } = useAppSelector(state => state.auth);

  return (
    <aside className={styles.mainMenuOptionsContainer}>
      <div className={styles.menuOptionsHeaderWrapper}>
        <div className={styles.menuHeader}>
          <img src={loggedIn?.avatar.startsWith('http') ? loggedIn?.avatar : S3Avatar(`${loggedIn?.avatar}`)} />
          <p>{loggedIn?.displayName}</p>
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
