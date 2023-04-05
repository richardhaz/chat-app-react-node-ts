import styles from './PrimaryLayout.module.scss';
import { Navbar } from '../components/navbar';
import ChatList from './chat-list/ChatList';
import MainMenuOptions from './main-menu-options/MainMenuOptions';

interface PrimaryLayoutProps {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  return (
    <div className={`${styles.primaryLayoutContainer}`}>
      <Navbar />
      <div className={styles.primaryLayoutContent}>
        <MainMenuOptions />
        <div className={styles.rootContent}>{children}</div>
        <ChatList />
      </div>
    </div>
  );
};

export default PrimaryLayout;
