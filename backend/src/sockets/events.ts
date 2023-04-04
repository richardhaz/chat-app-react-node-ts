const prefix = 'Chat';
const EVENTS = {
  INITIALIZE: 'connection',
  GET_ALL_MESSAGES: `${prefix}GetAllMessages`,
  SET_MESSAGE: `${prefix}SetMessage`,
  GET_ALL_ONLINE_USERS: `${prefix}GetAllOnlineUsers`,
  GET_ONLINE_USER: `${prefix}GetOnlineUser`,
  // and more events...
};
export { EVENTS };
