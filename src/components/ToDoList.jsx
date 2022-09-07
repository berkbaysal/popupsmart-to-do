import React, { useEffect, useState } from 'react';
import styles from '../styles/ToDoList.module.css';
const API_URL = 'https://6311f26ff5cba498da88f6db.mockapi.io/todos';

const ToDoList = () => {
  const [todoList, setTodoList] = useState(null);

  function constructJSXfromData(data) {
    if (!data) {
      return <div>Yapılacaklar listesi yükleniyor...</div>;
    }
    if (data.length === 0) {
      return <div>Yapılacaklar listesi boş.</div>;
    }
    return data.map((item, index) => (
      <div className={`${styles.listItemContainer} ${item.isCompleted ? styles.complete : styles.incomplete}`} key={'list-item-' + index}>
        <div className={styles.content}>{item.content}</div>
        <div className={styles.checkbox}>
          <input type="checkbox" id={'checkbox-' + index} checked={item.isCompleted} onChange={(e) => updateCompleted(index, e.target.checked)} />
          <label htmlFor={'checkbox-' + index}>Completed</label>
        </div>
      </div>
    ));
  }

  async function updateCompleted(changeIndex, newValue) {
    const res = await fetch(`${API_URL}/${todoList[changeIndex].id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isCompleted: newValue }),
    });
    const json = await res.json();

    setTodoList((oldList) => {
      let newList = [];
      oldList.forEach((listItem, index) => {
        if (index === changeIndex) {
          newList.push(json);
        } else {
          newList.push(listItem);
        }
      });
      return newList;
    });
  }

  async function fetchDataFromAPI() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodoList(data);
  }

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return (
    <div>
      <div className={styles.listTitle}>Yapılacaklar:</div>
      {constructJSXfromData(todoList)}
    </div>
  );
};

export default ToDoList;
