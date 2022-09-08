import React, { useState } from 'react';
import style from '../styles/TopBar.module.css';
import NewListItem from './NewListItem';

const TopBar = ({ name, setTodoList, todoList }) => {
  const [addingNewNote, setAddingNewNote] = useState(false);

  return (
    <div className={style.topBarContainer}>
      <div className={style.welcomeMessage}>Hoşgeldin {name}</div>
      <div className={style.subtitleContainer}>
        <div className={style.listTitle}>Yapılacaklar:</div>
        <div className={style.newNoteButton} onClick={() => setAddingNewNote(true)}>
          + Yeni Yapılacak Ekle
        </div>
      </div>
      {addingNewNote && <NewListItem setAddingNewNote={setAddingNewNote} setTodoList={setTodoList} todoList={todoList} />}
    </div>
  );
};

export default TopBar;
