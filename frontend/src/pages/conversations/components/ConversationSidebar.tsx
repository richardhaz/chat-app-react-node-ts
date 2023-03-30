import React from 'react';
import styles from './ConversationSidebar.module.scss';
import { FiSettings } from 'react-icons/fi';
import { BiSearch } from 'react-icons/bi';
import { RiSearchLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

interface ConversationSidebarProps {
  children: React.ReactNode;
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({ children }) => {
  return (
    <div className={styles.sidebarContainer}>
      <aside>
        <div className={styles.conversationHeaderWrapper}>
          <div className={styles.conversationHeader}>
            <div className={styles.headerNavTool}>
              <div>
                <p>Inbox</p>
                <span>2 new</span>
              </div>
              <button>
                <FiSettings />
              </button>
            </div>
            <div className={styles.inputWrapper}>
              <input placeholder="Search" />
              <span>
                <BiSearch />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.conversationList}>
          <Link to="123" className={styles.conversationListItem}>
            Chat 1
          </Link>
          <Link to="124" className={styles.conversationListItem}>
            Chat 2
          </Link>
          <div className={styles.conversationListItem}>Chat 3</div>
          <div className={styles.conversationListItem}>Chat 4</div>
          <div className={styles.conversationListItem}>Chat 5</div>
          <div className={styles.conversationListItem}>Chat 6</div>
          <div className={styles.conversationListItem}>Chat 7</div>
          <div className={styles.conversationListItem}>Chat 8</div>
          <div className={styles.conversationListItem}>Chat 9</div>
          <div className={styles.conversationListItem}>Chat 10</div>
          <div className={styles.conversationListItem}>Chat 11</div>
          <div className={styles.conversationListItem}>Chat 12</div>
          <div className={styles.conversationListItem}>Chat 13</div>
          <div className={styles.conversationListItem}>Chat 14</div>
          <div className={styles.conversationListItem}>Chat 15</div>
          <div className={styles.conversationListItem}>Chat 16</div>
          <div className={styles.conversationListItem}>Chat 17</div>
          <div className={styles.conversationListItem}>Chat 18</div>
          <div className={styles.conversationListItem}>Chat 19</div>
          <div className={styles.conversationListItem}>Chat 20</div>
        </div>
      </aside>
      <div className={styles.channelSection}>{children}</div>
    </div>
  );
};

export default ConversationSidebar;
