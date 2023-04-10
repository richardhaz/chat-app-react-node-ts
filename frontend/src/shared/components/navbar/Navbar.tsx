import styles from './Navbar.module.scss';
import { RiLogoutBoxLine, RiMessengerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { setChatListNavigationDrawer } from '@/redux/app/app.slice';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { ConfirmLogoutDialog } from './components/logout';
import NotificationsDropDownMenu from './components/notifications/NotificationsDropDownMenu';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { chatListNavigationDrawer } = useAppSelector((state) => state.app);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

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
              {/*  {socketMessage && <span>1</span>} */}
            </button>
          </Tooltip>
          {/* <NotificationsDropDownMenu /> */}
          <Tooltip title="LogOut" placement="bottom" arrow>
            <button className={styles.navIconButton} onClick={() => setOpenConfirmLogout(true)}>
              <RiLogoutBoxLine />
            </button>
          </Tooltip>
        </nav>
      </header>
      <ConfirmLogoutDialog openConfirmLogout={openConfirmLogout} setOpenConfirmLogout={setOpenConfirmLogout} />
    </>
  );
};

export default Navbar;
