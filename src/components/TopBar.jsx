import React from 'react';
import styles from '../styles/TopBar.module.css';

const TopBar = ({ name }) => {
  return <div className={styles.welcomeMessage}>Hoşgeldin {name}!</div>;
};

export default TopBar;
