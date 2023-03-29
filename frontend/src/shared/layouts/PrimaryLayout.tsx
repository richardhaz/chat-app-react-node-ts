import styles from './PrimaryLayout.module.scss';
import { AiOutlineBell, AiFillCaretDown } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import AvatarPlaceholder from '@/assets/images/avatars/avatar-placeholder.jpg';

interface PrimaryLayoutProps {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  return (
    <div className={`${styles.primaryLayoutContainer} container`}>
      <header>
        <h1>Chat</h1>
        <div className={styles.menuOptions}>
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
        </div>
      </header>
      <div className={styles.primaryLayoutContent}>{children}</div>
    </div>
  );
};

export default PrimaryLayout;
