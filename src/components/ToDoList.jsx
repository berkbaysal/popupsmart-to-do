import React, { useEffect } from 'react';

import ListItem from './ListItem';
const API_URL = 'https://6311f26ff5cba498da88f6db.mockapi.io/todos';

const ToDoList = ({ todoList, setTodoList }) => {
  function constructJSXfromData(data) {
    if (!data) {
      return <div>Yapılacaklar listesi yükleniyor...</div>;
    }
    if (data.length === 0) {
      return <div>Yapılacaklar listesi boş.</div>;
    }
    return data.map((item, index) => (
      <ListItem item={item} index={index} id={todoList[index].id} setTodoList={setTodoList} key={'list-item-' + index} />
    ));
  }

  async function fetchDataFromAPI() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodoList(data);
  }

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return <div>{constructJSXfromData(todoList)}</div>;
};

export default ToDoList;
