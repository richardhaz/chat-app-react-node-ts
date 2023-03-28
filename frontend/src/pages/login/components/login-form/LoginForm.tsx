import React from 'react';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="Email" className={styles.inputLabel}>
          Email
        </label>
        <input type="email" id="email" className={styles.inputField} />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="Password" className={styles.inputLabel}>
          Password
        </label>
        <input type="password" id="password" className={styles.inputField} />
      </div>
    </form>
  );
};

export default LoginForm;
