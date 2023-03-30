import styles from './PrimaryLayout.module.scss';
import { Navbar } from '../components/navbar';

interface PrimaryLayoutProps {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  return (
    <div className={`${styles.primaryLayoutContainer} container`}>
      <Navbar />
      <div className={styles.primaryLayoutContent}>{children}</div>
    </div>
  );
};

export default PrimaryLayout;
