import styles from './ConversationContentPage.module.scss';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

import { ConversationMessages } from '../components';
import { Skeleton } from '@mui/material';

/* 
<Skeleton animation="wave" variant="circular" width={40} height={40} />
) : (
  <Avatar
  alt="Ted talk"
  src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
  />
*/
const ConversationContentPage = () => {
  const isLoading = false;

  return (
    <div>
      <div className={styles.conversationContentHeaderWrapper}>
        <div className={styles.conversationContentHeader}>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              {isLoading ? (
                <ConversationHeaderLoading />
              ) : (
                <div className={styles.userNames}>
                  <img
                    src="https://img.freepik.com/premium-vector/cute-girl-with-unusual-blue-eyes-avatar-vector_658753-21.jpg?w=1380"
                    alt="user avatar"
                  />
                  <div>
                    <p>Leslies Alexander</p>
                    <span>3 minutes ago</span>
                  </div>
                </div>
              )}
            </div>
            <button className={styles.iconMenuButton}>
              <IoEllipsisVerticalSharp />
            </button>
          </div>
        </div>
      </div>
      <ConversationMessages />
    </div>
  );
};

export default ConversationContentPage;

const ConversationHeaderLoading = () => {
  return (
    <div className={styles.userNames}>
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
          width={180}
          height={18}
        />
        <Skeleton
          animation="wave"
          sx={{ bgcolor: 'grey.900' }}
          variant="rectangular"
          width={100}
          height={12}
        />
      </div>
    </div>
  );
};
