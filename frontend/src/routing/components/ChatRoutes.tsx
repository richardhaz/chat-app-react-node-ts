import { ConversationPage } from '@/pages/conversations';
import { ConversationContentPage } from '@/pages/conversations/conversation-content';
import { PrimaryLayout } from '@/shared/layouts';
import { Navigate, Route } from 'react-router-dom';
import { RoutesWrapper } from './RoutesWrapper';

export const ChatRoutes = () => {
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
    </>
  );
};
