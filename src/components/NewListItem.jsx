import React, { useState } from 'react';
import style from '../styles/NewListItem.module.css';
const API_URL = 'https://6311f26ff5cba498da88f6db.mockapi.io/todos';

const NewListItem = ({ setTodoList, setAddingNewNote, todoList }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  async function updateContent(note) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    const json = await res.json();
    setTodoList((oldList) => [...oldList, json]);
    setAddingNewNote(false);
  }

  function handleCancel() {
    setContent('');
    setAddingNewNote(false);
  }

  function getId() {
    if (todoList.length > 0) {
      return todoList[todoList.length - 1].id + 1;
    } else {
      return 1;
    }
  }

  function validate() {
    if (content.length >= 3) {
      setError(false);
      updateContent({ content: content, isCompleted: false, id: getId() });
    } else {
      setError(true);
    }
  }

  return (
    <div className={style.newItemContainer}>
      <div className={style.title}>Yeni Yapılacak:</div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className={`${style.content} ${error ? style.error : ''}`}></textarea>
      {error && <div className={style.errorText}>Yapılacak en az üç harf olmalı!</div>}
      <div className={style.buttons}>
        <button className={style.button} onClick={validate}>
          Ekle
        </button>
        <button className={style.button} onClick={handleCancel}>
          İptal
        </button>
      </div>
    </div>
  );
};

export default NewListItem;
