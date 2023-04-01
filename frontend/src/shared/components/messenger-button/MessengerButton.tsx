import { setChatListNavigationDrawer } from '@/redux/app/app.slice';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { RiMessengerLine } from 'react-icons/ri';
import styles from './MessengerButton.module.scss';

const MessengerButton = () => {
  const { chatListNavigationDrawer } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  return (
    <button
      className={styles.messengerButton}
      onClick={() => dispatch(setChatListNavigationDrawer(!chatListNavigationDrawer))}
    >
      <RiMessengerLine />
    </button>
  );
};

export default MessengerButton;
