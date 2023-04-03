import { useAppSelector } from '@/redux/useTypedRedux';
import styles from './ConversationMessageContent.module.scss';
import messagesMock from '@/__mocks__/Messages';
import moment from 'moment';
import { useState } from 'react';

const ConversationMessageContent = () => {
  const { messages } = useAppSelector((state) => state.message);
  /*   const [chatDate, setChatDate] = useState(null); */

  // format to show
  /*   moment(item.createdAt).isSame(item.createdAt, 'day') 
  moment(item.createdAt).format('MMMM DD, YYYY') */
  return (
    <>
      {messages.data.map((item, idx, arr) => (
        <div key={item._id} className={styles.conversationChatContainer}>
          {/*           <div className="text-divider">{moment(item.createdAt).format('MMMM DD, YYYY')}</div> */}
          {moment(item.createdAt).isSame(
            moment(arr[idx - 1]?.createdAt).format('YYYY-MM-DD'),
            'day'
          ) && <div className="text-divider">{moment(item.createdAt).format('MMMM DD, YYYY')}</div>}
          <div className={styles.messageContentContainer}>
            <div className={styles.messageContent}>
              <div className={styles.userAvatar}>
                <img src={item.userDetails.avatar} />
              </div>
              <div className={styles.currentMessage}>
                <div className={styles.userInfoDetails}>
                  <p className={styles.userName}>
                    {item.userDetails.firstName} {item.userDetails.lastName}
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
