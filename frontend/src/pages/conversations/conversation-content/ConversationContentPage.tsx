import styles from './ConversationContentPage.module.scss';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import Avatar from '@/assets/images/avatars/avatar.png';
import { BsEmojiSmile, BsSticky, BsStickyFill } from 'react-icons/bs';
import { BiImageAdd, BiImage } from 'react-icons/bi';
import { MdKeyboardVoice } from 'react-icons/md';
import { RiStickyNoteLine } from 'react-icons/ri';
import { ImImage } from 'react-icons/im';
import { MdOutlineImage } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';

const ConversationContentPage = () => {
  return (
    <div>
      <div className={styles.conversationContentHeaderWrapper}>
        <div className={styles.conversationContentHeader}>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              <div className={styles.userNames}>
                <img src={Avatar} alt="user-avatar" />
                <div>
                  <p>Leslies Alexander</p>
                  <span>3 minutes ago</span>
                </div>
              </div>
            </div>
            <button className={styles.iconMenuButton}>
              <IoEllipsisVerticalSharp />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.messageInputSection}>
        <div className={styles.messageInputContainer}>
          <button className={styles.messageEmojisContainer}>
            <BsFillEmojiLaughingFill />
          </button>
          <input placeholder="Send a message ..." />
          <div className={styles.messageOptionsContainer}>
            {/* <button className={styles.mediaMessageButton}>
              <MdOutlineImage />
            </button> */}
            {/*  <button className={styles.stickersMessageButton}>
              <RiStickyNoteLine />
            </button> */}
            <button className={styles.submitButton}>
              <IoSend />
            </button>
          </div>
        </div>
        <div className={styles.conversationsContainer}>
          {/*           <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id
            voluptatibus placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel
            fugiat totam neque nostrum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id
            voluptatibus placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel
            fugiat totam neque nostrum.
          </p> */}
          {renderLorems()}
        </div>
      </div>
    </div>
  );
};

export default ConversationContentPage;

const renderLorems = () => {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>{' '}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia harum ea iste id voluptatibus
        placeat eaque minima commodi qui, ab, nulla dolor dolorum, saepe alias? Vel fugiat totam
        neque nostrum.
      </p>
    </div>
  );
};
