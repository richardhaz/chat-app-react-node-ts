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
import { useParams } from 'react-router-dom';
import { generateUUID } from '@/shared/utils';
import { DetailedHTMLProps, FormHTMLAttributes, useEffect, useRef } from 'react';

/* const isMessages = true; */

const ConversationContent = () => {
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector((state) => state.auth);
  const { userById } = useAppSelector((state) => state.user);
  const { messages } = useAppSelector((state) => state.message);
  const { socketMessage } = useAppSelector((state) => state.socket);

  /*   console.log({ messages }); */

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors }
  } = useForm<{
    message: string;
  }>();

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

  // TODO: validate input max length 250 character

  return (
    <div className={styles.messageInputSection}>
      <div className={styles.conversationsContainer}>
        {messages.loading ? (
          <ConversationContentLoading />
        ) : !messages.loading && messages.data.length === 0 ? (
          <ConversationContentEmpty />
        ) : (
          <ConversationContentData />
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
