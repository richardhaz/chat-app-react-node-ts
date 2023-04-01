import styles from './ConversationMessages.module.scss';
import { IoSend } from 'react-icons/io5';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import ConversationMessageContent from './ConversationMessageContent';
import ConversationMessageEmpty from './ConversationMessageEmpty';

const isMessages = true;

const ConversationMessages = () => {
  return (
    <div className={styles.messageInputSection}>
      <div className={styles.messageInputContainer}>
        <button className={styles.messageEmojisContainer}>
          <BsFillEmojiLaughingFill />
        </button>
        <input placeholder="Send a message ..." />
        <div className={styles.messageOptionsContainer}>
          <button className={styles.submitButton}>
            <IoSend />
          </button>
        </div>
      </div>
      <div className={styles.conversationsContainer}>
        {isMessages ? <ConversationMessageContent /> : <ConversationMessageEmpty />}
      </div>
    </div>
  );
};

export default ConversationMessages;
