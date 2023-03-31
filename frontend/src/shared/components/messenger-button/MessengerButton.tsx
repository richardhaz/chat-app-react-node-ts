import { toggleNavigationDrawer } from '@/redux/app/app.slice';
import { useAppDispatch } from '@/redux/useTypedRedux';
import { RiMessengerLine } from 'react-icons/ri';
import styles from './MessengerButton.module.scss';

const MessengerButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button className={styles.messengerButton} onClick={() => dispatch(toggleNavigationDrawer())}>
      <RiMessengerLine />
    </button>
  );
};

export default MessengerButton;
