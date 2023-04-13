import EmptyContentImage from '@/assets/images/undraw/empty-content.svg';
import styles from './GlobalConversationContentEmpty.module.scss';
import { useAppSelector } from '@/redux/useTypedRedux';

const GlobalConversationContentEmpty = () => {
  const { userById } = useAppSelector((state) => state.user);
  return (
    <div className={styles.emptyConversationContainer}>
      <div>
        <h2>There is no messages to show</h2>
        <p>
          You haven&apos;t started a conversation with{' '}
          <span>
            {userById.data?.firstName} {userById.data?.lastName}
          </span>{' '}
          yet.
        </p>
      </div>
      <img src={EmptyContentImage} alt="empty-chat-image" />
    </div>
  );
};

export default GlobalConversationContentEmpty;
