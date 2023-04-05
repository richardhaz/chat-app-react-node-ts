import styles from './ChatPage.module.scss';
import { useWindowSize } from '@/shared/hooks';
import { OverlayLoader } from '@/shared/ui';
import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import { MessageThunk } from '@/redux/message/message.thunk';
import InboxSidebar from './components/inbox-sidebar/InboxSidebar';
import StartMessaging from './components/start-messaging/StartMessaging';

const ChatPage = () => {
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { loggedIn } = useAppSelector((state) => state.auth);

  // fetch user info if user is selected in chat
  useEffect(() => {
    if (id) {
      dispatch(UserThunk.getUserById(id));
    }
  }, [dispatch, id]);

  // fetch messages if user is selected
  useEffect(() => {
    if (loggedIn?._id && id) {
      const payload = { from: loggedIn._id, to: id };
      dispatch(MessageThunk.getAllMessages(payload));
    }
  }, [dispatch, id, loggedIn]);

  if (!windowSize.width) return <OverlayLoader />;

  return (
    <>
      <div className={styles.chatContainer}>
        <InboxSidebar />
        <div className={styles.channelSection}>
          <Outlet />
          {!id && <StartMessaging />}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
