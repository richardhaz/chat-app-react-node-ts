import { setUsersListNavigationDrawer } from '@/redux/app/app.slice';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { FiUsers } from 'react-icons/fi';
import styles from './UsersListButton.module.scss';

const UsersListButton = () => {
  const { usersListNavigationDrawer } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  return (
    <button
      className={styles.usersListButton}
      onClick={() => dispatch(setUsersListNavigationDrawer(!usersListNavigationDrawer))}
    >
      <FiUsers />
    </button>
  );
};

export default UsersListButton;
