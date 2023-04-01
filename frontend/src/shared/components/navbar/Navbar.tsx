import styles from './Navbar.module.scss';
import { FiSettings } from 'react-icons/fi';
import { RiNotification3Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME } from '@/config';
import { UserDropDownMenu } from './user-drop-down';

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <header>
      <Link to={`${pathname === `/${APP_NAME}/conversations` ? '#' : '/'}`}>Chatty App</Link>
      <nav>
        <button className={styles.navIconButton}>
          <RiNotification3Line />
        </button>
        <button className={styles.navIconButton}>
          <FiSettings />
        </button>
        <UserDropDownMenu />
      </nav>
    </header>
  );
};

export default Navbar;
