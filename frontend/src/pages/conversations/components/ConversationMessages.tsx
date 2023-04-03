import styles from './ConversationMessages.module.scss';
import { IoSend } from 'react-icons/io5';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import ConversationMessageContent from './ConversationMessageContent';
import ConversationMessageEmpty from './ConversationMessageEmpty';
import { useAppDispatch, useAppSelector } from '@/redux/useTypedRedux';
import { useForm } from 'react-hook-form';
import { MessageThunk } from '@/redux/message/message.thunk';
import { CreateMessageDto } from '@/shared/dtos/messages';

const isMessages = true;

const ConversationMessages = () => {
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector((state) => state.auth);
  const { userById } = useAppSelector((state) => state.user);

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
      // id of logged in user
      from: `${loggedIn?.id}`,
      // id of selected user in chat
      to: `${userById.data?._id}`,
      message: values.message
    };
    /* console.log('payload', payload); */
    reset();
    dispatch(MessageThunk.createMessage(messagePayload));
  };

  // TODO: validate input max length 250 character

  return (
    <div className={styles.messageInputSection}>
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
      <div className={styles.conversationsContainer}>
        {isMessages ? <ConversationMessageContent /> : <ConversationMessageEmpty />}
      </div>
    </div>
  );
};

export default ConversationMessages;
