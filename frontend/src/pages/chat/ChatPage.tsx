import styles from './ChatPage.module.scss';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { UserThunk } from '@/redux/user/user.thunk';
import { MessageThunk } from '@/redux/message/message.thunk';
import { InboxSidebar } from './components/inbox-sidebar';
import { StartMessaging } from './components/start-messaging';
import { ConversationThunk } from '@/redux/conversation/conversation.thunk';

const ChatPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { loggedIn } = useAppSelector((state) => state.auth);
  const { allMyConversations } = useAppSelector((state) => state.conversation);

  // fetch user info if user is selected in chat
  /*   useEffect(() => {
    if (params.id) {
      dispatch(ConversationThunk.getAllMyConversations({ senderId: `${loggedIn?._id}` }));
    }
  }, [dispatch]); */

  // open first conversation if there's at least one and no params id
  /*   useEffect(() => {
    if (allMyConversations.data.length > 0 && !params.id) {
      navigate(`/chat/${allMyConversations.data[0].contact._id}`);
    }
  }, []); */

  // fetch user info if user is selected in chat
  useEffect(() => {
    if (params.id) {
      dispatch(UserThunk.getUserById(params.id));
    }
  }, [dispatch, params.id]);

  // fetch messages if user is selected
  useEffect(() => {
    if (loggedIn?._id && params.id) {
      const payload = { from: loggedIn._id, to: params.id };
      dispatch(MessageThunk.getAllMessages(payload));
    }
  }, [dispatch, params.id, loggedIn]);

  // get conversation by members
  useEffect(() => {
    if (loggedIn?._id && params.id) {
      const payload = { member1: loggedIn._id, member2: params.id };
      dispatch(ConversationThunk.getConversationByMembers(payload));
    }
  }, [dispatch, params.id, loggedIn]);

  return (
    <>
      <div className={styles.chatContainer}>
        {/*     <InboxSidebar /> */}
        <div className={styles.channelSection}>
          <Outlet />
          {!params.id && <StartMessaging />}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
