import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import styles from './ConversationContentData.module.scss';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { ioSocket } from '@/shared/utils';
/* import { setSocketMessage } from '@/redux/socket/socket.slice'; */
import { MessageResultModel, UserModel } from '@/shared/models';

const ConversationContentData = () => {
  // TODO: FIX types
  // TODO: Fix other users watching others conversation
  // TODO: Fix not sending the first message
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.message);
  const { userById: receiver, me } = useAppSelector((state) => state.user);
  /*   const { socketMessage } = useAppSelector((state) => state.socket); */
  const [socketMessages, setSocketMessages] = useState(null);
  const [arrivalMessages, setArrivalMessages] = useState<MessageResultModel[]>(messages.data);

  const getSocketSender = () => {
    const user = [me.data, receiver.data]
      .filter((u) => u?._id === socketMessages?.senderId)
      .map((item) => item);
    return user;
  };

  // Get socket messages
  useEffect(() => {
    console.log('render-get-message');
    const socket = ioSocket();
    socket.on('getMessage', (data) => {
      setSocketMessages(data);
    });
  }, [dispatch]);

  /*   useEffect(()=>{

  },[])
 */

  /* 
  
    (socketMessages && me.data?._id === socketMessages.senderId) ||
      me.data?._id === socketMessages.receiverId
    


      
      
      */
  console.log('arrival-messags', arrivalMessages);
  console.log('__socket_messages', socketMessages);
  useEffect(() => {
    /*  && arrivalMessages.includes(socketMessages) */
    /*  && arrivalMessages.includes((u)=>u.) */
    if (
      socketMessages &&
      (me.data?._id === socketMessages.users[0] || me.data?._id === socketMessages.users[1])
    ) {
      console.log('render-prev-messages');
      setArrivalMessages((prev) => [
        ...prev,
        {
          fromSelf: me.data?._id === getSocketSender()[0]?._id,
          messageIdentifier: socketMessages.messageIdentifier,
          message: socketMessages.message,
          users: socketMessages.users,
          senderDetails: getSocketSender()[0] as UserModel,
          status: socketMessages.messageStatus,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }
    /*     console.log({ arrivalMessages }); */
  }, [socketMessages]);

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

  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [arrivalMessages]);

  return (
    <>
      {/*       {messages.data.map((item, idx, arr) => ( */}
      {arrivalMessages.map((item, idx, arr) => (
        <div
          ref={scrollRef}
          key={item?.messageIdentifier + idx}
          className={styles.conversationChatContainer}
        >
          <div className={styles.messageContentContainer}>
            <div className={styles.messageContent}>
              <div className={styles.userAvatar}>
                <img src={item?.senderDetails?.avatar} />
              </div>
              <div className={styles.currentMessage}>
                <div className={styles.userInfoDetails}>
                  <p className={styles.userName}>
                    {item.senderDetails?.firstName} {item?.senderDetails?.lastName}
                  </p>
                  {/* <p className={styles.messageDate}>Today at 6:41 PM</p> */}
                  <p className={styles.messageDate}>
                    {moment(item?.updatedAt).format('DD/MM/YYYY h:mm A')}
                  </p>
                </div>
                <div className={styles.message}>
                  <p>{item?.message}</p>
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
