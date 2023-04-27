import { Breadcrumb } from '@/shared/components/breadcrumb';
import styles from './MePage.module.scss';
import { useAppSelector } from '@/redux/useTypedRedux';

const MePage = () => {
  const { me } = useAppSelector(state => state.user);

  console.log(me);

  return (
    <div className={styles.meContainer}>
      <Breadcrumb section="My Account" />
      <div>
        <p>FirstName</p>
        <input placeholder="FirstName" />
      </div>
    </div>
  );
};

export default MePage;
