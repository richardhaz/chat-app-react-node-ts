import styles from './GlobalChatPage.module.scss';
import GlobalConversationContentPage from './components/global-conversation/GlobalConversation';

const GlobalChatPage = () => {
  return (
    <>
      <div className={styles.globalChatContainer}>
        <div className={styles.channelSection}>
          <GlobalConversationContentPage />
        </div>
      </div>
    </>
  );
};

export default GlobalChatPage;
