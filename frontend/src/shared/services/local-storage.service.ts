const key = {
  loggedIn: 'logged_in'
};

const setLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

const clearLocalStorage = (key: string): void => {
  return localStorage.removeItem(key);
};

const persistLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify({ ...value }));
};

export const LocalStorageService = {
  key,
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  persistLocalStorage
};
