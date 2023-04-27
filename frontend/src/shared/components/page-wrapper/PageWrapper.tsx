import React from 'react';
import styles from './PageWrapper.module.scss';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default PageWrapper;
