import styles from './Navbar.module.scss';
import { FiSettings } from 'react-icons/fi';
import { RiNotification3Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME } from '@/config';
import { UserDropDownMenu } from './user-drop-down';
import { RiMessengerLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { setChatListNavigationDrawer } from '@/redux/app/app.slice';

const Navbar = () => {
  const { pathname } = useLocation();
  const { chatListNavigationDrawer } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const notificationChat = null;
  const notificationSettings = null;
  const notificationGeneral = null;
  return (
    <header>
      <Link to={`${pathname === `/${APP_NAME}/conversations` ? '#' : '/'}`}>Chatty App</Link>
      <nav>
        <button
          className={styles.navIconMessengerButton}
          onClick={() => dispatch(setChatListNavigationDrawer(!chatListNavigationDrawer))}
        >
          <RiMessengerLine />
          {notificationChat && <span>1</span>}
        </button>
        <button className={styles.navIconButton}>
          <RiNotification3Line />
          {notificationSettings && <span>1</span>}
        </button>
        <button className={styles.navIconButton}>
          <FiSettings />
          {notificationGeneral && <span>1</span>}
        </button>
        <UserDropDownMenu />
      </nav>
    </header>
  );
};

export default Navbar;
