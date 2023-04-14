import styles from './GlobalConversationContent.module.scss';
import { IoSend } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { useForm } from 'react-hook-form';

import { generateUUID, playMessageSentSound } from '@/shared/utils';
import { useEffect, useState } from 'react';
import { GlobalMessageResultModel, SocketGlobalMessaggeData } from '@/shared/models';
import { setSocketGlobalMessages as setSocketGlobalMessagesAction } from '@/redux/socket/socket.slice';
import GlobalConversationContentLoading from './GlobalConversationContentLoading';
import { CreateGlobalMessageDto } from '@/shared/dtos/global-messages';
import { GlobalMessageThunk } from '@/redux/global-message/global-message.thunk';
import GlobalConversationContentEmpty from './GlobalConversationContentEmpty';
import GlobalConversationContentData from './GlobalConversationContentData';
import { EVENTS } from '@/sockets';
import { EventProps, useSocketEvents } from '@/shared/hooks';

const ConversationContent = () => {
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector(state => state.auth);
  const { globalMessages } = useAppSelector(state => state.globalMessage);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // socket
  const [arrivalMessages, setArrivalMessages] = useState<GlobalMessageResultModel[]>([]);
  const [socketGlobalMessages, setSocketGlobalMessages] = useState<SocketGlobalMessaggeData | null>(null);

  // set global messages from db to a new state
  useEffect(() => {
    setArrivalMessages(globalMessages.data);
  }, [globalMessages.data]);

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
    const messagePayload: CreateGlobalMessageDto = {
      from: `${loggedIn?._id}`,
      message: values.message,
      messageIdentifier: generateUUID()
    };
    playMessageSentSound();
    reset();
    dispatch(GlobalMessageThunk.createMessage(messagePayload));
  };

  /* SOCKET EVENTS */
  const events: EventProps[] = [
    // Get socket global message
    {
      name: EVENTS.GET_GLOBAL_MESSAGE,
      handler(globalMessage) {
        dispatch(setSocketGlobalMessagesAction(globalMessage));
        setSocketGlobalMessages(globalMessage);
      }
    }
  ];

  useSocketEvents(events);

  useEffect(() => {
    if (!loggedIn) return;
    if (!socketGlobalMessages) return;

    const newMessage: GlobalMessageResultModel = {
      message: socketGlobalMessages.message,
      fromSelf: loggedIn._id === socketGlobalMessages.senderId,
      messageIdentifier: socketGlobalMessages.messageIdentifier,
      messageStatus: socketGlobalMessages.messageStatus,
      sender: socketGlobalMessages.senderDetails,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setArrivalMessages(prev => [...prev, newMessage]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketGlobalMessages, loggedIn?._id]);

  return (
    <div className={styles.messageInputSection}>
      <div className={styles.conversationsContainer}>
        {globalMessages.loading ? (
          <GlobalConversationContentLoading />
        ) : arrivalMessages.length === 0 ? (
          <GlobalConversationContentEmpty />
        ) : (
          <GlobalConversationContentData arrivalMessages={arrivalMessages} />
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
            /*             onChange: (e: React.ChangeEvent<HTMLInputElement>) => setIsTyping(e.target.value) */
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
