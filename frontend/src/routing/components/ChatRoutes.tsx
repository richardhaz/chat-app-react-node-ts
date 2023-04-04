import { sizeConfig } from '@/config';
import { ConversationPage } from '@/pages/conversations';
import { ConversationContentPage } from '@/pages/conversations/conversation-content';
import { ChatListNavigationDrawer } from '@/shared/components/chat-list-navigation-drawer';
import { UsersListNavigationDrawer } from '@/shared/components/users-list-navigation-drawer';
import { useWindowSize } from '@/shared/hooks';
import { PrimaryLayout } from '@/shared/layouts';
/* import { OverlayLoader } from '@/shared/ui'; */
import { Navigate, Route } from 'react-router-dom';
import { RoutesWrapper } from './RoutesWrapper';
import { UsersListButton } from '@/shared/components/users-list-button';

export const ChatRoutes = () => {
  const window = useWindowSize();

  return (
    <>
      <PrimaryLayout>
        <RoutesWrapper>
          <Route path="/" element={<Navigate to="conversations" />} />
          {/* Chat Routes */}
          <Route path="conversations" element={<ConversationPage />}>
            <Route path=":id" element={<ConversationContentPage />} />
          </Route>
        </RoutesWrapper>
      </PrimaryLayout>
      {window.width && window.width <= sizeConfig().breakpoints['2xl'] ? (
        <ChatListNavigationDrawer />
      ) : null}
      {window.width && window.width <= sizeConfig().breakpoints.lg ? (
        <UsersListNavigationDrawer />
      ) : null}
      <UsersListButton />
    </>
  );
};
