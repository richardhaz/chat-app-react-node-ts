import { sizeConfig } from '@/config';
import { useWindowSize } from '@/shared/hooks';
import { OverlayLoader } from '@/shared/ui';
import { Outlet, useParams } from 'react-router-dom';
import { AllUsersSidebar, ConversationSidebar } from './components';
import { ConversationWelcomePage } from './conversation-welcome';
import styles from './ConversationPage.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import { MessageThunk } from '@/redux/message/message.thunk';

const ConversatiosPage = () => {
  const window = useWindowSize();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);

  // load all users
  useEffect(() => {
    dispatch(UserThunk.getAllUsers());
  }, [dispatch]);

  // fetch user info if user is selected in chat
  useEffect(() => {
    if (id) {
      dispatch(UserThunk.getUserById(id));
    }
  }, [dispatch, id]);

  // fetch messages if user is selected
  useEffect(() => {
    if (loggedIn?.id && id) {
      const payload = { from: loggedIn?.id, to: id };
      dispatch(MessageThunk.getAllMessages(payload));
    }
  }, [dispatch, id]);

  if (!window.width) return <OverlayLoader />;

  return (
    <>
      <div className={styles.conversationContainer}>
        {window.width >= sizeConfig().breakpoints.md ? <ConversationSidebar /> : null}
        <div className={styles.channelSection}>
          {!id ? <ConversationWelcomePage /> : <Outlet />}
        </div>
        {window.width >= sizeConfig().breakpoints.lg ? <AllUsersSidebar /> : null}
      </div>
    </>
  );
};

export default ConversatiosPage;
