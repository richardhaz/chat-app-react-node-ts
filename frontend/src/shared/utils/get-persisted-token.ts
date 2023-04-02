import { AuthReduxModel } from '@/redux/auth/auth.slice';

export const getPersistedToken = () => {
  const persistedRoot = localStorage.getItem('persist:root');

  if (!persistedRoot) return null;

  const store = JSON.parse(persistedRoot);

  if (!store) return null;

  const authStore = JSON.parse(store.auth) as AuthReduxModel;

  const token = authStore.token;
  return token;
};
