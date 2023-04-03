import styles from './ConversationContentPage.module.scss';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

import { ConversationMessages } from '../components';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '@/redux/useTypedRedux';

const ConversationContentPage = () => {
  const { userById } = useAppSelector((state) => state.user);

  return (
    <div>
      <div className={styles.conversationContentHeaderWrapper}>
        <div className={styles.conversationContentHeader}>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              {userById.loading ? (
                <ConversationHeaderLoading />
              ) : (
                <div className={styles.userNames}>
                  <img src={userById.data?.avatar} alt="user avatar" />
                  <div>
                    <p>
                      {userById.data?.firstName} {userById.data?.lastName}
                    </p>
                    {/* TODO: update minutes ago with socket io */}
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
