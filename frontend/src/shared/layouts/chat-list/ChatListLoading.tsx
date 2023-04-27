import { Skeleton } from '@mui/material';
import styles from './ChatListLoading.module.scss';

const ChatListLoading = () => {
  return (
    <div className={styles.usersList}>
      {Array.from(new Array(8)).map((item, idx) => (
        <div key={idx} className={styles.usersListItem}>
          <div className={styles.userProfile}>
            <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} variant="circular" width={45} height={45} />
            <div>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900', marginBottom: '10px' }}
                variant="rectangular"
                width={140}
                height={18}
              />
              <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={140} height={12} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListLoading;
