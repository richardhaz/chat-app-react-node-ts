import { sizeConfig } from '@/config';
import { ConversationPage } from '@/pages/conversations';
import { ConversationContentPage } from '@/pages/conversations/conversation-content';
import { ChatListNavigationDrawer } from '@/shared/components/chat-list-navigation-drawer';
import { UsersListNavigationDrawer } from '@/shared/components/users-list-navigation-drawer';
import { useWindowSize } from '@/shared/hooks';
import { PrimaryLayout } from '@/shared/layouts';
/* import { OverlayLoader } from '@/shared/ui'; */
import { Navigate, Route, useParams } from 'react-router-dom';
import { RoutesWrapper } from './RoutesWrapper';
import { UsersListButton } from '@/shared/components/users-list-button';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import { MessageThunk } from '@/redux/message/message.thunk';
/* import { Socket } from 'socket.io-client'; */
import { setOnlineUsers } from '@/redux/socket/socket.slice';
import { LoggedInModel } from '@/shared/models';
import { ioSocket } from '@/shared/utils';

export const ChatRoutes = () => {
  const dispatch = useAppDispatch();
  const { loggedIn, token } = useAppSelector((state) => state.auth);
  /*   const socket = useRef<Socket | undefined>(undefined); */
  const windowSize = useWindowSize();

  // load all users
  useEffect(() => {
    if (token) {
      dispatch(UserThunk.getAllUsers());
    }
  }, [dispatch, token]);

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

  return (
    <>
      <PrimaryLayout>
        <RoutesWrapper>
          <Route path="/" element={<Navigate to="conversations" />} />
          {/* Chat Routes */}
          <Route path="conversations" element={<ConversationPage />}>
            <Route path=":id" element={<ConversationContentPage />} />
          </Route>
        </RoutesWrapper>
      </PrimaryLayout>
      {windowSize.width && windowSize.width <= sizeConfig().breakpoints['2xl'] ? (
        <ChatListNavigationDrawer />
      ) : null}
      {windowSize.width && windowSize.width <= sizeConfig().breakpoints.lg ? (
        <UsersListNavigationDrawer />
      ) : null}
      <UsersListButton />
    </>
  );
};
