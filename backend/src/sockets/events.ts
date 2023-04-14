const prefix = 'Chat';

const EVENTS = {
  INITIALIZE: 'connection',
  SEND_MESSAGE: `${prefix}SendMessage`,
  SEND_GLOBAL_MESSAGE: `${prefix}SendGlobalMessage`,
  GET_SENT_MESSAGE: `${prefix}GetSentMessage`,
  GET_GLOBAL_MESSAGE: `${prefix}GetGlobalMessage`,
  ADD_ACTIVE_USER: `${prefix}AddActiveUser`,
  GET_ALL_ACTIVE_USERS: `${prefix}GetAllActiveUsers`,
};
export { EVENTS };
