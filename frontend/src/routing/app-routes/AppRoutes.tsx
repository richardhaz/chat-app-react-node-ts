import { toast } from 'react-toastify';

import { PrimaryLayout } from '@/shared/layouts';
import { Route, useNavigate } from 'react-router-dom';

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

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useAppSelector((state) => state.auth);
  const [socketMessage, setSocketMessage] = useState<SocketMessaggeData | null>(null);

  const MessageNotification = ({ socketMessage }: { socketMessage: SocketMessaggeData }) => {
    const linkStyle = {
      border: '1px solid',
      color: '#fff',
      background: 'black',
      padding: '5px'
    };

    const handleRedirect = () => {
      navigate(`/chat/${socketMessage.senderId}`);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {socketMessage.senderDetails.displayName} : {socketMessage.message}
        <button onClick={handleRedirect}>View Message</button>
        <button onClick={handleRedirect}>View Message</button>
        <button onClick={handleRedirect}>View Message</button>
        <button onClick={handleRedirect}>View Message</button>
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
        console.log('ALL CONNECTED USERS: ', users);
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
        console.log('MESSAGE_FOUND!!!!!!!!!!!');
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (socketMessage && loggedIn) {
      // check if loggedIn user belongs to the conversation
      if ([socketMessage.senderId, socketMessage.receiverId].includes(loggedIn._id)) {
        // check if the loggedIn user is the receiver, if its the sender the notification will not pop up
        if (socketMessage.receiverId === loggedIn._id) {
          /*  toast.dark(`${socketMessage.senderDetails.displayName} : ${socketMessage.message}`, {
            autoClose: 15000
          }); */
          toast(<MessageNotification socketMessage={socketMessage} />);
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
          <Route path="/global-chat" element={<div>Global Chat Page</div>} />
          <Route path="/me" element={<div>Me Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/friends" element={<div>Friends Page</div>} />
          <Route path="/bug-report" element={<div>Bug Report Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
          {/* Chat Routes */}
        </RoutesWrapper>
      </PrimaryLayout>
      {/* <UsersListNavigationDrawer /> */}
      {/*  <UsersListButton /> */}
    </>
  );
};
