import styles from './ConversationMessageContent.module.scss';
import messagesMock from '@/__mocks__/Messages';

const ConversationMessageContent = () => {
  return (
    <>
      {messagesMock.map((item) => (
        <div key={item._id} className={styles.conversationChatContainer}>
          <div className="text-divider">{item.startDate}</div>
          <div className={styles.messageContentContainer}>
            <div className={styles.messageContent}>
              <div className={styles.userAvatar}>
                <img src="https://i.pravatar.cc/150?img=43" />
              </div>
              <div className={styles.currentMessage}>
                <div className={styles.userInfoDetails}>
                  <p className={styles.userName}>Larry Herrera</p>
                  <p className={styles.messageDate}>Today at 6:41 PM</p>
                </div>
                <div className={styles.message}>
                  <p>
                    I dont really know what hes trynna to do but like i think hes overwelmed and i
                    hope he gets better soon
                  </p>
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
