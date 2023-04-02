export interface LoggedInModel {
  token: string;
  loggedIn: {
    id: string;
    email: string;
    username: string;
    displayName: string;
    isAdmin: boolean;
    isPremium: boolean;
    avatar: string;
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
