import { Server as SocketServer } from 'socket.io';

import { LoggedInModel } from '@/models';

export const chatSocket = (io: SocketServer) => {
  interface IOnlineUsers {
    profile: LoggedInModel;
    socketId: string;
  }
  let onlineUsers = [] as IOnlineUsers[];

  io.on('connection', (socket) => {
    // get all messages
    socket.on('message', (message) => {
      socket.broadcast.emit('message', message);
      console.log('message:', message);
    });

    // add new user
    socket.on('new_user_add', (newUser: LoggedInModel) => {
      // if user is not added before
      if (!onlineUsers.some((user) => user.profile._id === newUser._id)) {
        onlineUsers.push({ profile: { ...newUser, socketStatus: 'online' }, socketId: socket.id });
        console.log('new user is here!', onlineUsers);
      }
      // send all active users to new user
      io.emit('get_users', onlineUsers);
    });

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log(
        'FILTER_DISCONNECT:',
        onlineUsers.filter((user) => user.socketId !== socket.id),
      );
      console.log('user disconnected', onlineUsers);
      // send all online users to all users
      io.emit('get_users', onlineUsers);
    });

    socket.on('offline', () => {
      // remove user from active users
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log('user is offline', onlineUsers);
      // send all online users to all users
      io.emit('get_users', onlineUsers);
    });
  });
};
