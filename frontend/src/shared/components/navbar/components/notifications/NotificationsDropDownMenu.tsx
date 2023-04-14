import styles from './NotificationsDropDownMenu.module.scss';
import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Tooltip } from '@mui/material';
import { RiNotification3Line } from 'react-icons/ri';
import { SocketMessaggeData } from '@/shared/models';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { ioSocket } from '@/shared/utils';
import { SocketThunk } from '@/redux/socket/socket.thunk';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { EVENTS } from '@/sockets';

const NotificationsDropDownMenu = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notification, setNotification] = useState(1);
  const [socketMessage, setSocketMessage] = useState<SocketMessaggeData | null>(null);
  const { loggedIn } = useAppSelector((state) => state.auth);
  const { socketUserById } = useAppSelector((state) => state.socket);
  const params = useParams();

  /*   useEffect(() => {
    if (socketUserById?.data) {
      console.log('socket message user profile', socketUserById.data);
      console.log('socket message', socketMessage);
    }
  }, [socketUserById]);
 */
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // listen incomming messages
  useEffect(() => {
    const socket = ioSocket();
    socket.on(EVENTS.GET_SENT_MESSAGE, (data: SocketMessaggeData) => {
      setSocketMessage(data);
      dispatch(SocketThunk.getSocketUserById(data.senderId));
    });
  }, [dispatch]);

  return (
    <div>
      <Tooltip title="Notifications" placement="bottom" arrow>
        <button
          className={styles.navIconButton}
          onClick={(e) => {
            handleClick(e);
            setSocketMessage(null);
          }}
        >
          <RiNotification3Line />
          {socketMessage && <span>1</span>}
        </button>
      </Tooltip>
      <Menu
        PaperProps={{
          sx: {
            width: '300px',
            marginTop: '10px',
            backgroundColor: '#1a1a1a',
            color: 'white'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'notifications-dropdown-menu'
        }}
      >
        <MenuItem disableRipple sx={{ cursor: 'default', fontWeight: '600', fontSize: 'large' }}>
          New Messages:
        </MenuItem>
        {/*  {[].map((item, idx) => (
          <MenuItem
            disableRipple
            key={item._id}
            onClick={handleClose}
            sx={{ '&:hover': { backgroundColor: '#242424' } }}
          >
            <Link
              to={item.contact._id}
              className={`${styles.conversationListItem} ${
                item.contact._id === params.id && styles.conversationListItemSelected
              }`}
            >
              <div className={styles.userProfile}>
                <img src={item.contact.avatar} alt="user profile picture" />
                <div>
                  <p>
                    {item.contact.firstName} {item.contact.lastName}
                  </p>
                  <span>
                    {onlineUsers.filter((u) => u.profile._id === item.contact._id).length > 0
                      ? 'online'
                      : moment(item.updatedAt).fromNow()}
                  </span>
                </div>
                <span className={styles.lastConnection}>1min</span>
              </div>
              <p className={styles.message}>
                {item.senderId === loggedIn?._id && 'You: '}
                {item.lastMessage}
              </p>
              {item.contact._id === params.id && <div className={styles.dotNotification}></div>}
            </Link>
          </MenuItem>
        ))} */}
      </Menu>
    </div>
  );
};

export default NotificationsDropDownMenu;
