import styles from './Navbar.module.scss';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { RiNotification3Line } from 'react-icons/ri';
import Avatar from '@/assets/images/avatars/avatar.png';
import { useAppDispatch } from '@/redux/useTypedRedux';

const Navbar = () => {
  const dispatch = useAppDispatch();
  return (
    <header>
      <h1>Chat</h1>
      <nav>
        <button className={styles.navIconButton}>
          <RiNotification3Line />
        </button>
        <button className={styles.navIconButton}>
          <FiSettings />
        </button>
        <button className={styles.menuUser}>
          <img src={Avatar} />
          <p>ampeter19#9834</p>
          <span>
            <AiFillCaretDown />
          </span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
