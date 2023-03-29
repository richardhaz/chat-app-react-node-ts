import { Outlet, useParams } from 'react-router-dom';
import { ConversationSidebar, ConversationWelcome } from './components';

const ConversatiosPage = () => {
  const { id } = useParams();
  return <ConversationSidebar>{!id ? <ConversationWelcome /> : <Outlet />}</ConversationSidebar>;
};

export default ConversatiosPage;
