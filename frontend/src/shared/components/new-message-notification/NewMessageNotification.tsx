import { APP_ROUTES } from '@/shared/constants';
import { SocketMessaggeData } from '@/shared/models';
import { useNavigate } from 'react-router-dom';

interface NewMessageNotificationProps {
  socketMessage: SocketMessaggeData;
}

const NewMessageNotification: React.FC<NewMessageNotificationProps> = ({ socketMessage }) => {
  const navigate = useNavigate();

  const linkStyle = {
    border: '1px solid',
    color: '#fff',
    background: 'black',
    padding: '5px'
  };

  const handleRedirect = () => {
    navigate(`${APP_ROUTES.chat}/${socketMessage.senderId}`);
  };

  return (
    <div>
      New Message
      <div onClick={handleRedirect} style={linkStyle}>
        View message
      </div>
    </div>
  );
};

export default NewMessageNotification;
