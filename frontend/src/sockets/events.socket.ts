const prefix = 'Chat';
const SOCKET_EVENTS = {
  INITIALIZE: 'connection',
  GET_ALL_MESSAGES: `${prefix}GetAllMessages`,
  GET_ALL_ONLINE_USERS: `${prefix}GetAllOnlineUsers`,
  GET_ONLINE_USER: `${prefix}GetOnlineUser`
  // and more events...
};
export { SOCKET_EVENTS };
