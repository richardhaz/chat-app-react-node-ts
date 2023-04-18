import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';

type IBreadCrumb = {
  section: string;
};

export const BreadCrumb = ({ section }: IBreadCrumb) => {
  return (
    <div className={styles.breadcrumb}>
      <Link to="/">Home&nbsp;</Link>
      <h2>› {section}</h2>
    </div>
  );
};
export default BreadCrumb;
