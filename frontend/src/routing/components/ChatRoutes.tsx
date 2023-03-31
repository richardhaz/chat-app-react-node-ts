import { sizeConfig } from '@/config';
import { ConversationPage } from '@/pages/conversations';
import { ConversationContentPage } from '@/pages/conversations/conversation-content';
import { NavigationDrawer } from '@/shared/components/navigation-drawer';
import { useWindowSize } from '@/shared/hooks';
import { PrimaryLayout } from '@/shared/layouts';
/* import { OverlayLoader } from '@/shared/ui'; */
import { Navigate, Route } from 'react-router-dom';
import { RoutesWrapper } from './RoutesWrapper';

export const ChatRoutes = () => {
  const window = useWindowSize();
  return (
    <>
      <RoutesWrapper>
        <Route path="/" element={<Navigate to="conversations" />} />
        {/* Chat Routes */}
        <Route path="conversations" element={<ConversationPage />}>
          <Route path=":id" element={<ConversationContentPage />} />
        </Route>
      </RoutesWrapper>
      {window.width && window.width < sizeConfig().breakpoints.md ? <NavigationDrawer /> : null}
    </>
  );
};
