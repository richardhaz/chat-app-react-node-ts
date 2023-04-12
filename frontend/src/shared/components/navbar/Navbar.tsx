import styles from './Navbar.module.scss';
import { RiLogoutBoxLine, RiMessengerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { setUsersListNavigationDrawer } from '@/redux/app/app.slice';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { ConfirmLogoutDialog } from './components/logout';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const { usersListNavigationDrawer } = useAppSelector((state) => state.app);

  return (
    <>
      <header>
        <Link to="/">The Guilty Dev</Link>
        <Tooltip title="Click here to go to global chat" placement="bottom" arrow>
          <button className={`${styles.globalChat} text-rainbow-animation`}>Chatty App</button>
        </Tooltip>
        <nav>
          <Tooltip title="Inbox" placement="bottom" arrow>
            <button
              className={styles.navIconMessengerButton}
              onClick={() => dispatch(setUsersListNavigationDrawer(!usersListNavigationDrawer))}
            >
              <RiMessengerLine />
            </button>
          </Tooltip>
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
