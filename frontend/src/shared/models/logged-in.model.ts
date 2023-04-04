export interface LoggedInModel {
  token: string;
  loggedIn: {
    _id: string;
    email: string;
    username: string;
    displayName: string;
    isAdmin: boolean;
    isPremium: boolean;
    avatar: string;
    socketStatus?: 'online' | 'idle' | 'offline';
  };
}
/* 

export interface LoggedInModel {
  user: {
    _id: string;
    displayName: string;
  };
  isPremium: boolean;
  isAdmin: boolean;
}

*/
