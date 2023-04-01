import { sizeConfig } from '@/config';
import { useWindowSize } from '@/shared/hooks';
import { OverlayLoader } from '@/shared/ui';
import { Outlet, useParams } from 'react-router-dom';
import { AllUsersSidebar, ConversationSidebar } from './components';
import { ConversationWelcomePage } from './conversation-welcome';
import styles from './ConversationPage.module.scss';

const ConversatiosPage = () => {
  const window = useWindowSize();
  const { id } = useParams();

  if (!window.width) return <OverlayLoader />;

  return (
    <>
      <div className={styles.conversationContainer}>
        {window.width >= sizeConfig().breakpoints.md ? <ConversationSidebar /> : null}
        <div className={styles.channelSection}>
          {!id ? <ConversationWelcomePage /> : <Outlet />}
        </div>
        {window.width >= sizeConfig().breakpoints.lg ? <AllUsersSidebar /> : null}
      </div>
    </>
  );
};

export default ConversatiosPage;
