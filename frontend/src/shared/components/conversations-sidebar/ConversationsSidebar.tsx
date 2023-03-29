import { Outlet } from 'react-router-dom';

const ConversationsSidebar = () => {
  return (
    <div>
      <div>Sidebar</div>
      <Outlet />
    </div>
  );
};

export default ConversationsSidebar;
