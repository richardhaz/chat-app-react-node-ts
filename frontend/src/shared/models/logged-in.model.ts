export interface LoggedInModel {
  token: string;
  loggedIn: {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isPremium: boolean;
    avatar: string;
    connectionStatus?: 'online' | 'idle' | 'offline';
  };
}
