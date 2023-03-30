import styles from './Navbar.module.scss';
import { AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import AvatarPlaceholder from '@/assets/images/avatars/avatar-placeholder.jpg';

const Navbar = () => {
  return (
    <header>
      <h1>Chat</h1>
      <nav>
        <button className={styles.messagesButton}>
          <span>
            <FiEdit />
          </span>
          Messages
        </button>
        <button className={styles.notificationsButton}>
          <AiOutlineBell />
        </button>
        <button className={styles.menuUser}>
          <img src={AvatarPlaceholder} />
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
