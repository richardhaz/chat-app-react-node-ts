import { MessageResultModel } from '@/shared/models';
import styles from './ConversationContentData.module.scss';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/useTypedRedux';

interface ConversationContentData {
  arrivalMessages: MessageResultModel[];
}

const ConversationContentData: React.FC<ConversationContentData> = ({ arrivalMessages }) => {
  const { userById: receiver } = useAppSelector((state) => state.user);
  // TODO: FIX types
  // TODO: Fix other users watching others conversation
  // TODO: Fix not sending the first message

  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [arrivalMessages]);

  return (
    <>
      {arrivalMessages.map((item, idx) => (
        <div ref={scrollRef} key={item?.messageIdentifier + idx}>
          {item.fromSelf ? (
            <div className={styles.conversationChatContainer}>
              <div className={styles.messageContentContainerOwn}>
                <div className={styles.currentMessageContainerOwn}>
                  <div className={styles.currentMessageOwn}>
                    <div className={styles.messageOwn}>
                      <p>{item?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className={styles.messageDateOwn}>
                {/*                     {moment.duration(item?.updatedAt, 'days').days() > 2
                      ? moment(item?.updatedAt).format('MMM D, YYYY [at] h:mm A z')
                      : moment(item?.updatedAt).fromNow()} */}

                {moment(item?.updatedAt).format('MMM D, YYYY [at] h:mm A z')}
              </p>
            </div>
          ) : (
            <div className={styles.conversationChatContainer}>
              <div className={styles.messageContentContainer}>
                <div className={styles.messageContent}>
                  <div className={styles.userAvatar}>
                    <img src={receiver.data?.avatar} />
                  </div>
                  <div className={styles.currentMessage}>
                    <div className={styles.userInfoDetails}>
                      <p className={styles.userName}>
                        {receiver.data?.firstName} {receiver.data?.lastName}
                      </p>
                      {/* <p className={styles.messageDate}>Today at 6:41 PM</p> */}
                    </div>
                    <div className={styles.message}>
                      <p>{item?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className={styles.messageDate}>
                {/*                     {moment.duration(item?.updatedAt, 'days').days() > 2
                      ? moment(item?.updatedAt).format('MMM D, YYYY [at] h:mm A z')
                      : moment(item?.updatedAt).fromNow()} */}

                {moment(item?.updatedAt).format('MMM D, YYYY [at] h:mm A z')}
              </p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ConversationContentData;
