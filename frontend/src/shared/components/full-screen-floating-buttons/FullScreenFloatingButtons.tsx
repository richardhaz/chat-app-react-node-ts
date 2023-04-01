import styles from './FullScreenFloatingButtons.module.scss';
import { MessengerButton } from '../messenger-button';
import { UsersListButton } from '../users-list-button';

const FullScreenFloatingButtons = () => {
  return (
    <div className={styles.floatingButtonsContainer}>
      <MessengerButton />
      <UsersListButton />
    </div>
  );
};

export default FullScreenFloatingButtons;
