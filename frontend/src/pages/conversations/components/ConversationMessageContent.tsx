import { useAppSelector } from '@/redux/useTypedRedux';
import styles from './ConversationMessageContent.module.scss';
import moment from 'moment';
import { Skeleton } from '@mui/material';
import ConversationMessageEmpty from './ConversationMessageEmpty';

const ConversationMessageContent = () => {
  const { messages } = useAppSelector((state) => state.message);

  // format to show
  /*   moment(item.createdAt).isSame(item.createdAt, 'day') 
  moment(item.createdAt).format('MMMM DD, YYYY') */

  return (
    <>
      {messages.data.map((item, idx, arr) => (
        <div key={item._id} className={styles.conversationChatContainer}>
          {/*           <div className="text-divider">{moment(item.createdAt).format('MMMM DD, YYYY')}</div> */}
          {/*   {moment(item.createdAt).isSame(
            moment(arr[idx - 1]?.createdAt).format('YYYY-MM-DD'),
            'day'
          ) && <div className="text-divider">{moment(item.createdAt).format('MMMM DD, YYYY')}</div>} */}
          <div className={styles.messageContentContainer}>
            <div className={styles.messageContent}>
              <div className={styles.userAvatar}>
                <img src={item.senderDetails.avatar} />
              </div>
              <div className={styles.currentMessage}>
                <div className={styles.userInfoDetails}>
                  <p className={styles.userName}>
                    {item.senderDetails.firstName} {item.senderDetails.lastName}
                  </p>
                  {/* <p className={styles.messageDate}>Today at 6:41 PM</p> */}
                  <p className={styles.messageDate}>
                    {moment(item.updatedAt).format('DD/MM/YYYY h:mm A')}
                  </p>
                </div>
                <div className={styles.message}>
                  <p>{item.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ConversationMessageContent;

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

/* 

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

*/
