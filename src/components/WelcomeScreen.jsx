import React, { useState } from 'react';
import styles from '../styles/WelcomeScreen.module.css';

const WelcomeScreen = ({ setUsername }) => {
  const [userInput, setUserInput] = useState('');
  const [inputHasError, setInputHasError] = useState(false);

  function handleButton() {
    const reformattedName = reformatName();
    if (reformattedName) {
      localStorage.setItem('username', reformattedName);
      setUsername(reformattedName);
    }
  }

  function reformatName() {
    if (userInput.length < 3) {
      setInputHasError(true);
      return null;
    } else {
      let reformattedName = userInput.toLowerCase();
      reformattedName = reformattedName.charAt(0).toUpperCase() + reformattedName.slice(1);
      return reformattedName;
    }
  }

  return (
    <div className={styles.welcomeScreenContainer}>
      <div className={styles.welcomeMessage}>Merhaba!</div>
      <label htmlFor="username-input-field" className={styles.userPrompt}>
        Başlamak için lütfen ismini gir:
      </label>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className={inputHasError ? styles.nameFieldError : styles.nameField}
        id="username-input-field"
        placeholder="İsmin"
      />
      {inputHasError && <div className={styles.errorText}>Kullanıcı adı en az üç harf olmalı!</div>}
      <button onClick={(e) => handleButton()} className={styles.proceedButton}>
        Başla
      </button>
    </div>
  );
};

export default WelcomeScreen;
