import Drawer from '@mui/material/Drawer';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { toggleNavigationDrawer } from '@/redux/app/app.slice';
import mockConversations from '@/__mocks__/Conversations';
import { Link } from 'react-router-dom';
import Avatar from '@/assets/images/avatars/avatar.png';
import styles from './NavigationDrawer.module.scss';
import { BiSearch } from 'react-icons/bi';

const NavigationDrawer = () => {
  const { navigationDrawerState } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  // TODO: rename navigation drawer to messenger-drawer and create a new settings drawer

  const renderMessagesList = () => {
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
        <div className={styles.conversationList}>
          {mockConversations.map((item) => (
            <Link
              key={item._id}
              to={`/chat/conversations/${item._id}`}
              className={styles.conversationListItem}
              onClick={() => dispatch(toggleNavigationDrawer())}
            >
              <div className={styles.userProfile}>
                <img src={Avatar} alt="user profile picture" />
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
      </>
    );
  };

  return (
    <div>
      <Drawer
        PaperProps={{ sx: { backgroundColor: '#1a1a1a' } }}
        open={navigationDrawerState}
        onClose={() => dispatch(toggleNavigationDrawer())}
      >
        {renderMessagesList()}
      </Drawer>
    </div>
  );
};

export default NavigationDrawer;
