import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import styles from './ConversationContentData.module.scss';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ioSocket } from '@/shared/utils';
import { setSocketMessage } from '@/redux/socket/socket.slice';
import { UserModel } from '@/shared/models';

const ConversationContentData = () => {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.message);
  const { userById: receiver, me } = useAppSelector((state) => state.user);
  const { socketMessage } = useAppSelector((state) => state.socket);
  const [arrivalMessages, setArrivalMessages] = useState<any[]>(messages.data);

  const getSocketSender = () => {
    const user = [me.data, receiver.data]
      .filter((u) => u?._id === socketMessage?.senderId)
      .map((item) => item);
    return user;
  };

  // Get socket messages
  useEffect(() => {
    console.log('render-get-message');
    const socket = ioSocket();
    socket.on('getMessage', (data) => {
      dispatch(setSocketMessage(data));
    });
  }, [dispatch]);

  useEffect(() => {
    if (socketMessage) {
      console.log('render-prev-messages');
      setArrivalMessages((prev) => [
        ...prev,
        {
          fromSelf: me.data?._id === getSocketSender()[0]?._id,
          messageIdentifier: socketMessage.messageIdentifier,
          message: socketMessage.message,
          senderDetails: getSocketSender()[0] as UserModel,
          status: socketMessage.messageStatus,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }
    /*     console.log({ arrivalMessages }); */
  }, [socketMessage]);

  /*   console.log(getSocketSender());
  console.log({ socketMessage });
  console.log('messages', messages.data); */

  /* 

  
    _id: string;
  fromSelf: boolean;
  senderDetails: UserModel;
  message: string;
  status: MESSAGE_STATUS;
  createdAt: string;
  updatedAt: string;

  */
  /*   const tempMessages = [...messages.data]; */

  /*   useEffect(() => { */
  /*     if (socketMessage) {
      tempMessages.push({
        fromSelf: me.data?._id === getSocketSender()[0]?._id,
        messageIdentifier: socketMessage.messageIdentifier,
        message: socketMessage.message,
        senderDetails: getSocketSender()[0] as UserModel,
        status: socketMessage.messageStatus,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    setArrivalMessages((prev) => [...prev]); */
  /*     socketMessage && setArrivalMessages([socketMessage, tempMessages]); */
  /*     console.log('finale-push', arrivalMessages);
  }, [socketMessage]); */

  /* 

export interface MessageModel {
  _id: string;
  messageIdentifier: string;
  message: {
    text: string;
    status: MESSAGE_STATUS;
  };
  createdAt: string;
  updatedAt: string;
  users: UserModel[];
  sender: string;
}


*/

  /*   useEffect(() => {
    if (getSocketSender() && socketMessage) {
      setArrivalMessages({
        messageIdentifier: socketMessage.messageIdentifier
      });
    }
  }, []); */

  /*   const mergedMessages = [...messages.data]; */

  /*   console.log({ socketMessage }); */

  // format to show
  /*   moment(item.createdAt).isSame(item.createdAt, 'day') 
  moment(item.createdAt).format('MMMM DD, YYYY') */

  return (
    <>
      {/*       {messages.data.map((item, idx, arr) => ( */}
      {arrivalMessages.map((item, idx, arr) => (
        <div key={item.messageIdentifier + idx} className={styles.conversationChatContainer}>
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

export default ConversationContentData;
