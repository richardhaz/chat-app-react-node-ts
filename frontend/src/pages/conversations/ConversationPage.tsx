import { useRef } from 'react';
import { sizeConfig } from '@/config';
import { useWindowSize } from '@/shared/hooks';
import { OverlayLoader } from '@/shared/ui';
import { Outlet, useParams } from 'react-router-dom';
import { AllUsersSidebar, ConversationSidebar } from './components';
import { ConversationWelcomePage } from './conversation-welcome';
import styles from './ConversationPage.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import { MessageThunk } from '@/redux/message/message.thunk';
import { Socket } from 'socket.io-client';
import { ioSocket } from '@/shared/utils';
import { LoggedInModel, UserModel } from '@/shared/models';
import { setOnlineUsers } from '@/redux/socket/socket.slice';

const ConversatiosPage = () => {
  const windowSize = useWindowSize();
  const { id } = useParams();
  /*   const socket = useRef<Socket | undefined>(undefined); */
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);

  // load all users
  useEffect(() => {
    dispatch(UserThunk.getAllUsers());
  }, [dispatch]);

  // fetch user info if user is selected in chat
  /*   useEffect(() => {
    if (id) {
      dispatch(UserThunk.getUserById(id));
    }
  }, [dispatch, id]); */

  // fetch messages if user is selected
  useEffect(() => {
    if (loggedIn?._id && id) {
      const payload = { from: loggedIn._id, to: id };
      dispatch(MessageThunk.getAllMessages(payload));
    }
  }, [dispatch, id]);

  // Connect to Socket.io and get all online users
  useEffect(() => {
    if (loggedIn) {
      const socket = ioSocket();
      socket.emit('new_user_add', loggedIn);
      socket.on('get_users', (users: LoggedInModel['loggedIn'][]) => {
        /* dispatch(UserThunk.getSocketUserById(users)); */
        dispatch(setOnlineUsers(users));
        console.log('ALL CONNECTED USERS: ', users);
      });
    }
  }, [dispatch, loggedIn]);

  if (!windowSize.width) return <OverlayLoader />;

  return (
    <>
      <div className={styles.conversationContainer}>
        {windowSize.width >= sizeConfig().breakpoints.md ? <ConversationSidebar /> : null}
        <div className={styles.channelSection}>
          {!id ? <ConversationWelcomePage /> : <Outlet />}
        </div>
        {windowSize.width >= sizeConfig().breakpoints.lg ? <AllUsersSidebar /> : null}
      </div>
    </>
  );
};

export default ConversatiosPage;
