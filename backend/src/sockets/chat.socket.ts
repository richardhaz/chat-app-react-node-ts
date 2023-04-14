import { Server as SocketServer } from 'socket.io';

import { MESSAGE_STATUS } from '@/constants';
import { SocketUserModel } from '@/models';

import { EVENTS } from './events';

export const chatSocket = (io: SocketServer) => {
  interface IOnlineUsers {
    profile: SocketUserModel;
    socketId: string;
  }

  let onlineUsers = [] as IOnlineUsers[];

  io.on('connection', (socket) => {
    // send message
    socket.on(EVENTS.SEND_MESSAGE, ({ senderId, receiverId, message, messageIdentifier, senderDetails }) => {
      io.emit(EVENTS.GET_SENT_MESSAGE, {
        senderId,
        receiverId,
        senderDetails,
        message,
        messageIdentifier,
        messageStatus: MESSAGE_STATUS.DELIVERED,
      });
    });

    // send global message
    socket.on(EVENTS.SEND_GLOBAL_MESSAGE, ({ senderId, message, messageIdentifier, senderDetails, fromSelf }) => {
      io.emit(EVENTS.GET_GLOBAL_MESSAGE, {
        senderId,
        senderDetails,
        fromSelf,
        message,
        messageIdentifier,
        messageStatus: MESSAGE_STATUS.DELIVERED,
      });
    });

    // add new active user
    socket.on(EVENTS.ADD_ACTIVE_USER, (newUser: SocketUserModel) => {
      // if user is not added before
      if (!onlineUsers.some((user) => user.profile._id === newUser._id)) {
        onlineUsers.push({ profile: { ...newUser, connectionStatus: 'online' }, socketId: socket.id });
      }
      // send all active users to new user
      io.emit(EVENTS.GET_ALL_ACTIVE_USERS, onlineUsers);
    });

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      // send all online users to all users
      io.emit(EVENTS.GET_ALL_ACTIVE_USERS, onlineUsers);
    });

    socket.on(EVENTS.TYPING, (room) => {
      console.log(room);
      socket.in(room).emit(EVENTS.TYPING);
    });
    socket.on(EVENTS.STOP_TYPING, (room) => {
      console.log(room);
      socket.in(room).emit(EVENTS.STOP_TYPING);
    });
  });
};
