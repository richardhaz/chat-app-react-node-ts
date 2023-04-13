import { Server as SocketServer } from 'socket.io';

import { MESSAGE_STATUS } from '@/constants';
import { SocketUserModel } from '@/models';

export const chatSocket = (io: SocketServer) => {
  interface IOnlineUsers {
    profile: SocketUserModel;
    socketId: string;
  }

  let onlineUsers = [] as IOnlineUsers[];

  const getUser = (userId: string) => {
    return onlineUsers.find((u) => u.profile._id === userId);
  };

  io.on('connection', (socket) => {
    // send message
    socket.on('sendMessage', ({ senderId, receiverId, message, messageIdentifier, senderDetails }) => {
      const user = getUser(receiverId);
      console.log('socketId', user?.socketId);
      io.emit('getMessage', {
        senderId,
        receiverId,
        senderDetails,
        message,
        messageIdentifier,
        messageStatus: MESSAGE_STATUS.DELIVERED,
      });
    });

    // send global message
    socket.on('sendGlobalMessage', ({ senderId, message, messageIdentifier, senderDetails, fromSelf }) => {
      io.emit('getGlobalMessage', {
        senderId,
        senderDetails,
        fromSelf,
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
    socket.on('new_user_add', (newUser: SocketUserModel) => {
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
