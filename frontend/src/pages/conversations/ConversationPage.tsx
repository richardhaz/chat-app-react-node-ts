import { Outlet, useParams } from 'react-router-dom';
import { ConversationSidebar } from './components';
import { ConversationWelcomePage } from './conversation-welcome';

const ConversatiosPage = () => {
  const { id } = useParams();
  return (
    <ConversationSidebar>{!id ? <ConversationWelcomePage /> : <Outlet />}</ConversationSidebar>
  );
};

export default ConversatiosPage;
