import { toast } from 'react-toastify';

import { PrimaryLayout } from '@/shared/layouts';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './AppRoute.module.scss';
import { RoutesWrapper } from '../components';
import { HomePage } from '@/pages/home';
import { ChatPage } from '@/pages/chat';
import { ConversationContentPage } from '@/pages/chat/components/conversation';
import { ioSocket } from '@/shared/utils';
import { setOnlineUsers } from '@/redux/socket/socket.slice';
import { LoggedInModel, MessageNotificationProps, SocketMessaggeData } from '@/shared/models';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import { MePage } from '@/pages/me';
import { GlobalChatPage } from '@/pages/global-chat';
import { BugReportPage } from '@/pages/bug-report';
import { AboutPage } from '@/pages/about';
import { UsersListNavigationDrawer } from '@/shared/components/users-list-navigation-drawer';
import { EVENTS } from '@/sockets';

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const socket = ioSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn } = useAppSelector(state => state.auth);
  const [socketMessage, setSocketMessage] = useState<SocketMessaggeData | null>(null);

  const MessageNotification: React.FC<MessageNotificationProps> = ({ socketMessage }) => {
    const handleRedirect = () => {
      navigate(`/chat/${socketMessage.senderId}`);
      toast.dismiss();
    };

    return (
      <div className={styles.messageNotificationContainer}>
        <p className={styles.message}>
          {socketMessage.senderDetails.displayName} : {socketMessage.message}
        </p>
        <button className={styles.viewMessage} onClick={handleRedirect}>
          View Message
        </button>
      </div>
    );
  };

  // load all users
  useEffect(() => {
    dispatch(UserThunk.getAllUsers());
  }, [dispatch]);

  // get profile
  useEffect(() => {
    dispatch(UserThunk.getProfile());
  }, [dispatch]);

  // Connect to Socket.io
  useEffect(() => {
    if (!loggedIn) return;
    socket.emit(EVENTS.ADD_ACTIVE_USER, loggedIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* SOCKET EVENTS */
  useEffect(() => {
    const socket = ioSocket();
    socket.on(EVENTS.GET_ALL_ACTIVE_USERS, (users: LoggedInModel[]) => {
      dispatch(setOnlineUsers(users));
    });
  }, [dispatch]);

  useEffect(() => {
    const socket = ioSocket();
    socket.on(EVENTS.GET_SENT_MESSAGE, (msgData: SocketMessaggeData) => {
      setSocketMessage(msgData);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!loggedIn || !socketMessage) return;
    // check if loggedIn user belongs to the conversation
    if ([socketMessage.senderId, socketMessage.receiverId].includes(loggedIn._id) === false) return;
    if (socketMessage.receiverId !== loggedIn._id) return;
    // check if the user has the chat open
    if (location.pathname.startsWith('/chat')) return;

    toast(<MessageNotification socketMessage={socketMessage} />, { autoClose: 15000 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketMessage]);

  return (
    <>
      <PrimaryLayout>
        <RoutesWrapper>
          <Route path="/" element={<HomePage />} />
          <Route path="chat" element={<ChatPage />}>
            <Route path=":id" element={<ConversationContentPage />} />
          </Route>
          <Route path="/global-chat" element={<GlobalChatPage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/bug-report" element={<BugReportPage />} />
          <Route path="/about" element={<AboutPage />} />
        </RoutesWrapper>
      </PrimaryLayout>
      <UsersListNavigationDrawer />
    </>
  );
};
