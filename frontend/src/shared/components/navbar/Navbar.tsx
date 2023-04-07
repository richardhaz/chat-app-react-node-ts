import styles from './Navbar.module.scss';
import { RiNotification3Line, RiLogoutBoxLine, RiMessengerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { setChatListNavigationDrawer } from '@/redux/app/app.slice';
import { Tooltip } from '@mui/material';
import { logOutUser } from '@/redux/auth/auth.slice';
import { useState } from 'react';
import ConfirmLogout from './components/ConfirmLogout';

const Navbar = () => {
  const { chatListNavigationDrawer } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  const notificationChat = null;
  const notificationSettings = null;
  return (
    <>
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
              {notificationChat && <span>1</span>}
            </button>
          </Tooltip>
          <Tooltip title="Notifications" placement="bottom" arrow>
            <button className={styles.navIconButton}>
              <RiNotification3Line />
              {notificationSettings && <span>1</span>}
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
