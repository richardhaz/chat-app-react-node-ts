import { Skeleton } from '@mui/material';
import styles from './ConversationHeaderLoading.module.scss';

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

export default ConversationHeaderLoading;
