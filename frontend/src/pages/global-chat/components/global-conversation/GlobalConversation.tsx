import styles from './GlobalConvervation.module.scss';
import { GlobalConversationContent } from '../global-conversation-content';
import { GlobalConversationHeader } from '../global-conversation-header';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { GlobalMessageThunk } from '@/redux/global-message/global-message.thunk';

const GlobalConversationContentPage = () => {
  const { loggedIn } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GlobalMessageThunk.getAllMessages({ from: `${loggedIn?._id}` }));
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
