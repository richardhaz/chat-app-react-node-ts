import styles from './Navbar.module.scss';
import { RiNotification3Line, RiLogoutBoxLine, RiMessengerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { setChatListNavigationDrawer } from '@/redux/app/app.slice';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import ConfirmLogout from './components/ConfirmLogout';
import { ioSocket, playNotificationSound } from '@/shared/utils';
import { SocketMessaggeData } from '@/shared/models';
import { SocketThunk } from '@/redux/socket/socket.thunk';

const Navbar = () => {
  const { chatListNavigationDrawer } = useAppSelector((state) => state.app);
  const { socketUserById } = useAppSelector((state) => state.socket);
  const dispatch = useAppDispatch();
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [socketMessage, setSocketMessage] = useState<SocketMessaggeData | null>(null);
  /*   const [notification, setNotification] = useState(1); */

  // listen incomming messages
  useEffect(() => {
    const socket = ioSocket();
    socket.on('getMessage', (data: SocketMessaggeData) => {
      setSocketMessage(data);
      dispatch(SocketThunk.getSocketUserById(data.senderId));
    });
  }, [dispatch]);

  /*   useEffect(() => {
    if (socketMessage) {
      playNotificationSound();
    }
  }, [socketMessage]); */

  const notificationChat = null;
  const notificationSettings = null;
  return (
    <>
      <div>
        new message from {socketUserById.data?.firstName} : {socketMessage?.message}
      </div>
      <header>
        <Link to="/">Chatty App</Link>
        <Tooltip title="Click here to go to global chat" placement="bottom" arrow>
          <button className={`${styles.globalChat} text-rainbow-animation`}>Global Chat</button>
        </Tooltip>
        <nav>
          <Tooltip title="Inbox" placement="bottom" arrow>
            <button
              className={styles.navIconMessengerButton}
              onClick={() => dispatch(setChatListNavigationDrawer(!chatListNavigationDrawer))}
            >
              <RiMessengerLine />
              {socketMessage && <span>1</span>}
            </button>
          </Tooltip>
          <Tooltip title="Notifications" placement="bottom" arrow>
            <button className={styles.navIconButton}>
              <RiNotification3Line />
              {socketMessage && <span>1</span>}
            </button>
          </Tooltip>
          <Tooltip title="LogOut" placement="bottom" arrow>
            <button className={styles.navIconButton} onClick={() => setOpenConfirmLogout(true)}>
              <RiLogoutBoxLine />
            </button>
          </Tooltip>
          {/*         <Tooltip title="Settings" placement="bottom" arrow>
          <button className={styles.navIconButton}>
            <FiSettings />
            {notificationGeneral && <span>1</span>}
          </button>
        </Tooltip>
        <UserDropDownMenu /> */}
        </nav>
      </header>
      <ConfirmLogout
        openConfirmLogout={openConfirmLogout}
        setOpenConfirmLogout={setOpenConfirmLogout}
      />
    </>
  );
};

export default Navbar;
