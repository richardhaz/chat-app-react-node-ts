import styles from './GlobalConversationHeader.module.scss';

const GlobalConversationHeader = () => {
  return (
    <div className={styles.conversationContentHeader}>
      <div className={styles.userInfoContainer}>
        <p>Welcome to global chat</p>
      </div>
    </div>
  );
};

export default GlobalConversationHeader;
