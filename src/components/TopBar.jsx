import React, { useState } from 'react';
import style from '../styles/TopBar.module.css';
import NewListItem from './NewListItem';
import { MdDarkMode } from 'react-icons/md';
import { BsSun } from 'react-icons/bs';

const TopBar = ({ name, setTodoList, todoList, darkmode, toggleDarkMode }) => {
  const [addingNewNote, setAddingNewNote] = useState(false);

  return (
    <div className={style.topBarContainer}>
      <div className={style.titleContainer}>
        <span className={style.welcomeMessage}>Hoşgeldin {name} </span>
        <span className={style.darkmodeToggle} onClick={toggleDarkMode}>
          {darkmode ? <BsSun /> : <MdDarkMode />}
        </span>
      </div>
      <div className={style.subtitleContainer}>
        <div className={style.listTitle}>Yapılacaklar:</div>
        <div className={style.newNoteButton} onClick={() => setAddingNewNote(true)}>
          + Yeni Yapılacak Ekle
        </div>
      </div>
      {addingNewNote && <NewListItem setAddingNewNote={setAddingNewNote} setTodoList={setTodoList} todoList={todoList} darkmode={darkmode} />}
    </div>
  );
};

export default TopBar;
