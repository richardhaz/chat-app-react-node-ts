import styles from './Convervation.module.scss';

import ConversationContent from '../conversation-content/ConversationContent';
import ConversationHeader from '../conversation-header/ConversationHeader';

const ConversationContentPage = () => {
  return (
    <div>
      <div className={styles.conversationContentHeaderWrapper}>
        <ConversationHeader />
      </div>
      <ConversationContent />
    </div>
  );
};

export default ConversationContentPage;
