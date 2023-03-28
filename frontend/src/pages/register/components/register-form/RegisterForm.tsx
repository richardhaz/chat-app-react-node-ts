import React from 'react';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="Email" className={styles.inputLabel}>
          Email
        </label>
        <input type="email" id="email" className={styles.inputField} />
      </div>
      <section className={styles.nameFieldRow}>
        <div className={styles.inputContainer}>
          <label htmlFor="FirstName" className={styles.inputLabel}>
            First Name
          </label>
          <input type="text" id="firstName" className={styles.inputField} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="LastName" className={styles.inputLabel}>
            Last Name
          </label>
          <input type="text" id="lastName" className={styles.inputField} />
        </div>
      </section>
      <div className={styles.inputContainer}>
        <label htmlFor="Password" className={styles.inputLabel}>
          Password
        </label>
        <input type="password" id="password" className={styles.inputField} />
      </div>
      <button>Create My Account</button>
    </form>
  );
};

export default RegisterForm;
