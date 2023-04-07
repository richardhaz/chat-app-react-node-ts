import styles from './ConversationContent.module.scss';
import { IoSend } from 'react-icons/io5';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { useForm } from 'react-hook-form';
import { MessageThunk } from '@/redux/message/message.thunk';
import { CreateMessageDto } from '@/shared/dtos/messages';
import { ConversationContentLoading } from './ConversationContentLoading';
import ConversationContentEmpty from './ConversationContentEmpty';
import ConversationContentData from './ConversationContentData';
import { generateUUID, ioSocket } from '@/shared/utils';
import { useEffect, useState } from 'react';
import { MessageResultModel, SocketMessaggeData } from '@/shared/models';

const ConversationContent = () => {
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector((state) => state.auth);
  const { userById } = useAppSelector((state) => state.user);
  const { messages } = useAppSelector((state) => state.message);
  const [arrivalMessages, setArrivalMessages] = useState<MessageResultModel[]>([]);

  useEffect(() => {
    setArrivalMessages(messages.data);
  }, [messages.data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors }
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

    reset();
    dispatch(MessageThunk.createMessage(messagePayload));
  };

  // socket
  const { me } = useAppSelector((state) => state.user);
  const [socketMessages, setSocketMessages] = useState<SocketMessaggeData | null>(null);

  // Get socket messages
  useEffect(() => {
    /*     console.log('render-get-message'); */
    const socket = ioSocket();
    socket.on('getMessage', (data) => {
      setSocketMessages(data);
    });
  }, [dispatch]);

  useEffect(() => {
    // TODO: fix velivering wrong chat conversation

    if (socketMessages) {
      // check if the sender and receiver are in the same chat as sender or receiver
      if (
        (loggedIn?._id === socketMessages.senderId &&
          userById.data?._id === socketMessages.receiverId) ||
        (loggedIn?._id === socketMessages.receiverId &&
          userById.data?._id === socketMessages.senderId)
      ) {
        setArrivalMessages((prev) => [
          ...prev,
          {
            fromSelf: loggedIn?._id === socketMessages.senderId,
            messageIdentifier: socketMessages.messageIdentifier,
            message: socketMessages.message,
            senderId: socketMessages.senderId,
            status: socketMessages.messageStatus,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketMessages, me.data?._id]);

  return (
    <div className={styles.messageInputSection}>
      <div className={styles.conversationsContainer}>
        {messages.loading && arrivalMessages.length === 0 ? (
          <ConversationContentLoading />
        ) : arrivalMessages.length === 0 ? (
          <ConversationContentEmpty />
        ) : (
          <ConversationContentData arrivalMessages={arrivalMessages} />
        )}
      </div>
      <form
        className={styles.messageInputContainer}
        onSubmit={handleSubmit((values) => onSubmit(values))}
      >
        <button className={styles.messageEmojisContainer}>
          <BsFillEmojiLaughingFill />
        </button>
        <input
          placeholder="Send a message ..."
          type="text"
          {...register('message', { required: true, maxLength: 250 })}
        />
        {/*         {errors.message && errors.message.message && (
          <span className="">{errors.message.message}</span>
        )} */}
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
