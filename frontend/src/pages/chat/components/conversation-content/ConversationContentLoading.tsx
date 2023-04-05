import { Skeleton } from '@mui/material';
import styles from './ConversationContentLoading.module.scss';

export const ConversationContentLoading = () => {
  return (
    <div className={styles.conversationChatContainer}>
      {Array.from(new Array(6)).map((item, idx) => (
        <div key={idx} className={styles.messageContentContainer}>
          <div className={styles.messageContent}>
            <div className={styles.userAvatar}>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: 'grey.900' }}
                variant="circular"
                width={45}
                height={45}
              />
            </div>
            <div className={styles.currentMessage} style={{ width: '100%' }}>
              <div className={styles.userInfoDetails}>
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: 'grey.900', marginBottom: '5px', borderRadius: '5px' }}
                  variant="rectangular"
                  width="30%"
                  height={15}
                />
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: 'grey.900', marginBottom: '5px', borderRadius: '5px' }}
                  variant="rectangular"
                  width="20%"
                  height={15}
                />
              </div>
              <div className={styles.message}>
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: 'grey.900', borderRadius: '10px' }}
                  variant="rectangular"
                  height={15}
                  width="80%"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
