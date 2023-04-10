import { toast } from 'react-toastify';

import { PrimaryLayout } from '@/shared/layouts';
import { Route, useNavigate, useParams } from 'react-router-dom';
import styles from './AppRoute.module.scss';
import { RoutesWrapper } from '../components';
import { HomePage } from '@/pages/home';
import { ChatPage } from '@/pages/chat';
import { ConversationContentPage } from '@/pages/chat/components/conversation';
import { ioSocket } from '@/shared/utils';
import { setOnlineUsers } from '@/redux/socket/socket.slice';
import { LoggedInModel, SocketMessaggeData } from '@/shared/models';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import { ConversationThunk } from '@/redux/conversation/conversation.thunk';
import { MePage } from '@/pages/me';
import { GlobalChatPage } from '@/pages/global-chat';
import { BugReportPage } from '@/pages/bug-report';
import { AboutPage } from '@/pages/about';
import { UsersListButton } from '@/shared/components/users-list-button';
import { UsersListNavigationDrawer } from '@/shared/components/users-list-navigation-drawer';

export const AppRoutes = () => {
  interface MessageNotificationProps {
    socketMessage: SocketMessaggeData;
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useAppSelector((state) => state.auth);
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

  // fetch user info if user is selected in chat
  useEffect(() => {
    dispatch(ConversationThunk.getAllMyConversations({ senderId: `${loggedIn?._id}` }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Connect to Socket.io and get all online users
  useEffect(() => {
    if (loggedIn) {
      const socket = ioSocket();
      socket.emit('new_user_add', loggedIn);
      socket.on('get_users', (users: LoggedInModel[]) => {
        dispatch(setOnlineUsers(users));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // listen incomming messages
  useEffect(() => {
    if (loggedIn) {
      const socket = ioSocket();
      socket.on('getMessage', (data: SocketMessaggeData) => {
        setSocketMessage(data);
      });
    }
  }, []);

  useEffect(() => {
    if (socketMessage && loggedIn) {
      // check if loggedIn user belongs to the conversation
      if ([socketMessage.senderId, socketMessage.receiverId].includes(loggedIn._id)) {
        // check if the loggedIn user is the receiver, if its the sender the notification will not pop up
        if (socketMessage.receiverId === loggedIn._id) {
          toast(<MessageNotification socketMessage={socketMessage} />, { autoClose: 15000 });
        }
      }
    }
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
          {/* Chat Routes */}
        </RoutesWrapper>
      </PrimaryLayout>
      <UsersListNavigationDrawer />
      {/*  <UsersListButton /> */}
    </>
  );
};
