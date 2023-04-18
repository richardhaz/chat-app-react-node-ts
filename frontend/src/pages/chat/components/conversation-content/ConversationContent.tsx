import styles from './ConversationContent.module.scss';
import { IoSend } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { useForm } from 'react-hook-form';
import { MessageThunk } from '@/redux/message/message.thunk';
import { CreateMessageDto } from '@/shared/dtos/messages';
import { ConversationContentLoading } from './ConversationContentLoading';
import ConversationContentEmpty from './ConversationContentEmpty';
import ConversationContentData from './ConversationContentData';
import { generateUUID, ioSocket, playMessageSentSound } from '@/shared/utils';
import { useEffect, useState } from 'react';
import { MessageResultModel, SocketMessaggeData } from '@/shared/models';
import { setSocketMessages as setSocketMessagesAction } from '@/redux/socket/socket.slice';
import { EVENTS } from '@/sockets';

const ConversationContent = () => {
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector(state => state.auth);
  const { userById } = useAppSelector(state => state.user);
  const { messages } = useAppSelector(state => state.message);

  const [arrivalMessages, setArrivalMessages] = useState<MessageResultModel[]>([]);
  const [socketMessages, setSocketMessages] = useState<SocketMessaggeData | null>(null);

  // set messages from db to a new state
  useEffect(() => {
    setArrivalMessages(messages.data);
  }, [messages.data]);

  /* FORM */
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<{
    message: string;
  }>();

  // TODO: validate input max length 250 character
  const onSubmit = (values: { message: string }) => {
    const messagePayload: CreateMessageDto = {
      from: `${loggedIn?._id}`,
      to: `${userById.data?._id}`,
      message: values.message,
      messageIdentifier: generateUUID()
    };
    playMessageSentSound();
    reset();
    dispatch(MessageThunk.createMessage(messagePayload));
  };

  /* SOCKET EVENTS */

  useEffect(() => {
    const socket = ioSocket();
    socket.on(EVENTS.GET_SENT_MESSAGE, message => {
      dispatch(setSocketMessagesAction(message));
      setSocketMessages(message);
    });
  }, [dispatch]);

  /* SET SOCKET MESSAGES */
  function usersBelongToCurrentChat(socketMessages: SocketMessaggeData) {
    // check if the sender and receiver are in the same chat as sender or receiver
    return (
      (loggedIn?._id === socketMessages.senderId && userById.data?._id === socketMessages.receiverId) ||
      (loggedIn?._id === socketMessages.receiverId && userById.data?._id === socketMessages.senderId)
    );
  }

  useEffect(() => {
    if (!socketMessages) return;
    if (!usersBelongToCurrentChat(socketMessages)) return;

    const newMessage: MessageResultModel = {
      fromSelf: loggedIn?._id === socketMessages.senderId,
      messageIdentifier: socketMessages.messageIdentifier,
      message: socketMessages.message,
      senderId: socketMessages.senderId,
      status: socketMessages.messageStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setArrivalMessages(prev => [...prev, newMessage]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketMessages, loggedIn?._id]);

  return (
    <div className={styles.messageInputSection}>
      <div className={styles.conversationsContainer}>
        {messages.loading || userById.loading ? (
          <ConversationContentLoading />
        ) : arrivalMessages.length === 0 ? (
          <ConversationContentEmpty />
        ) : (
          <ConversationContentData arrivalMessages={arrivalMessages} />
        )}
      </div>

      <form className={styles.messageInputContainer} onSubmit={handleSubmit(values => onSubmit(values))}>
        <input
          maxLength={250}
          placeholder="Send a message ..."
          type="text"
          {...register('message', {
            required: true,
            maxLength: 250
          })}
        />
        <div className={styles.messageOptionsContainer}>
          <button className={styles.submitButton} disabled={!isValid}>
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConversationContent;
