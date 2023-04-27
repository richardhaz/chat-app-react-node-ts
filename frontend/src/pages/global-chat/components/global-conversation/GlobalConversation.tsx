import styles from './GlobalConvervation.module.scss';
import { GlobalConversationContent } from '../global-conversation-content';
import { GlobalConversationHeader } from '../global-conversation-header';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { GlobalMessageThunk } from '@/redux/global-message/global-message.thunk';

const GlobalConversationContentPage = () => {
  const { loggedIn } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loggedIn) {
      dispatch(GlobalMessageThunk.getAllMessages({ from: loggedIn._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <div className={styles.conversationContentHeaderWrapper}>
        <GlobalConversationHeader />
      </div>
      <GlobalConversationContent />
    </div>
  );
};

export default GlobalConversationContentPage;
