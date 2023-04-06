import { PrimaryLayout } from '@/shared/layouts';
import { Route } from 'react-router-dom';

import { RoutesWrapper } from '../components';
import { HomePage } from '@/pages/home';
import { ChatPage } from '@/pages/chat';
import ConversationContentPage from '@/pages/chat/components/conversation/Conversation';
import { getPersistedToken, ioSocket } from '@/shared/utils';
import { setOnlineUsers } from '@/redux/socket/socket.slice';
import { LoggedInModel } from '@/shared/models';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UsersListNavigationDrawer } from '@/shared/components/users-list-navigation-drawer';
import { UserThunk } from '@/redux/user/user.thunk';

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.user);
  const { messages } = useAppSelector((state) => state.message);

  // load all users
  useEffect(() => {
    if (getPersistedToken()) {
      dispatch(UserThunk.getAllUsers());
    }
  }, [dispatch]);

  // get profile
  useEffect(() => {
    if (getPersistedToken()) {
      dispatch(UserThunk.getProfile());
    }
  }, [dispatch]);

  // Connect to Socket.io and get all online users
  useEffect(() => {
    if (loggedIn) {
      const socket = ioSocket();
      socket.emit('new_user_add', loggedIn);
      socket.on('get_users', (users: LoggedInModel['loggedIn'][]) => {
        dispatch(setOnlineUsers(users));
        console.log('ALL CONNECTED USERS: ', users);
      });
    }
  }, [dispatch, loggedIn]);

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
          {/* Chat Routes */}
        </RoutesWrapper>
      </PrimaryLayout>
      <UsersListNavigationDrawer />
      {/*  <UsersListButton /> */}
    </>
  );
};
