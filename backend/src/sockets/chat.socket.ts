import { Server as SocketServer } from 'socket.io';

import { MESSAGE_STATUS } from '@/constants';
import { LoggedInModel } from '@/models';

export const chatSocket = (io: SocketServer) => {
  interface IOnlineUsers {
    profile: LoggedInModel;
    socketId: string;
  }

  let onlineUsers = [] as IOnlineUsers[];

  const getUser = (userId: string) => {
    return onlineUsers.find((u) => u.profile._id === userId);
  };

  io.on('connection', (socket) => {
    // send message
    socket.on('sendMessage', ({ senderId, receiverId, message, messageIdentifier }) => {
      const user = getUser(receiverId);
      console.log('socketId', user?.socketId);
      io.emit('getMessage', {
        senderId,
        receiverId,
        message,
        messageIdentifier,
        messageStatus: MESSAGE_STATUS.DELIVERED,
      });
    });

    // get all messages
    socket.on('message', (message) => {
      socket.broadcast.emit('message', message);
      console.log('message:', message);
    });

    // add new user
    socket.on('new_user_add', (newUser: LoggedInModel) => {
      // if user is not added before
      if (!onlineUsers.some((user) => user.profile._id === newUser._id)) {
        onlineUsers.push({ profile: { ...newUser, connectionStatus: 'online' }, socketId: socket.id });
        /*         console.log('new user is here!', onlineUsers); */
      }
      // send all active users to new user
      io.emit('get_users', onlineUsers);
    });

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      /*       console.log('user disconnected', onlineUsers); */
      // send all online users to all users
      io.emit('get_users', onlineUsers);
    });

    socket.on('offline', () => {
      // remove user from active users
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      /*       console.log('user is offline', onlineUsers); */
      // send all online users to all users
      io.emit('get_users', onlineUsers);
    });
  });
};
