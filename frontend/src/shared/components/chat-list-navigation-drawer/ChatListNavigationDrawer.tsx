import Drawer from '@mui/material/Drawer';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { setChatListNavigationDrawer } from '@/redux/app/app.slice';
import mockConversations from '@/__mocks__/Conversations';
import { Link } from 'react-router-dom';
import styles from './ChatListNavigationDrawer.module.scss';
import { BiSearch } from 'react-icons/bi';
import { APP_NAME } from '@/config';
import { Skeleton } from '@mui/material';

const ChatListNavigationDrawer = () => {
  const { chatListNavigationDrawer } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  // TODO: rename navigation drawer to messenger-drawer and create a new settings drawer

  const renderMessagesList = () => {
    const isLoading = false;

    const messageCount = 2;
    return (
      <>
        <div className={styles.conversationHeaderWrapper}>
          <div className={styles.conversationHeader}>
            <div className={styles.headerNavTool}>
              <div>
                <p>Inbox</p>
              </div>
              <span>{`${messageCount} new message(s)`}</span>
            </div>
            <div className={styles.inputWrapper}>
              <input placeholder="Search" />
              <span>
                <BiSearch />
              </span>
            </div>
          </div>
        </div>
        {isLoading ? (
          <ChatListNavigationDrawerLoading />
        ) : (
          <div className={styles.conversationList}>
            {mockConversations.map((item) => (
              <Link
                key={item._id}
                to={`/${APP_NAME}/conversations/${item._id}`}
                className={styles.conversationListItem}
                onClick={() => dispatch(setChatListNavigationDrawer(!chatListNavigationDrawer))}
              >
                <div className={styles.userProfile}>
                  <img src="https://i.pravatar.cc/300" alt="user profile picture" />
                  <div>
                    <p>
                      {item.firstName} {item.lastName}
                    </p>
                    <span>online</span>
                  </div>
                  <span className={styles.lastConnection}>1min</span>
                </div>
                <div className={styles.message}>{item.lastMessage}</div>
                <div className={styles.dotNotification}></div>
              </Link>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <Drawer
        PaperProps={{ sx: { backgroundColor: '#1a1a1a' } }}
        open={chatListNavigationDrawer}
        onClose={() => dispatch(setChatListNavigationDrawer(false))}
      >
        {renderMessagesList()}
      </Drawer>
    </div>
  );
};

export default ChatListNavigationDrawer;

const ChatListNavigationDrawerLoading = () => {
  return (
    <div className={styles.conversationList}>
      {Array.from(new Array(6)).map((item, idx) => (
        <div key={idx} className={styles.conversationListItem}>
          <div className={styles.userProfile}>
            <Skeleton
              animation="wave"
              sx={{ bgcolor: 'grey.900' }}
              variant="circular"
              width={45}
              height={45}
            />
            <div>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900', marginBottom: '10px' }}
                variant="rectangular"
                width={140}
                height={18}
              />
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900' }}
                variant="rectangular"
                width={140}
                height={12}
              />
            </div>
            <div>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900', marginBottom: '25px' }}
                variant="rectangular"
                width={16}
                height={8}
              />
            </div>
          </div>
          <Skeleton
            animation="wave"
            sx={{ bgcolor: 'grey.900' }}
            variant="rectangular"
            width={180}
            height={12}
          />
        </div>
      ))}
    </div>
  );
};
