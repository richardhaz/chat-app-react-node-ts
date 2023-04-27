import styles from './AboutPage.module.scss';
import BreadCrumb from '@/shared/components/breadcrumb/Breadcrumb';

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      <BreadCrumb section="About" />
      <div className={styles.contentWrapper}>
        <p>This app was meant to be as part of a projects collection. </p>
        <h3 className={styles.releases}>April, 4 2023</h3>
        <ul>
          <li>Chat App v1.0</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
