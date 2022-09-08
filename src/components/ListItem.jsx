import React, { useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import style from '../styles/ListItem.module.css';
const API_URL = 'https://6311f26ff5cba498da88f6db.mockapi.io/todos';

const ListItem = ({ item, index, id, setTodoList }) => {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(item.content);
  const [updatingContent, setUpdatingContent] = useState(false);
  const [updatingCompleted, setUpdatingCompleted] = useState(false);
  const [deletingContent, setDeletingContent] = useState(false);

  async function updateCompleted(changeIndex, newValue) {
    setUpdatingCompleted(true);
    const res = await fetch(`${API_URL}/${id}`, {
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
    setUpdatingCompleted(false);
  }
  async function updateContent(changeIndex, newValue) {
    setUpdatingContent(true);
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newValue }),
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
    setUpdatingContent(false);
  }

  async function deleteContent(changeIndex) {
    setDeletingContent(true);

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await res.json();
    setTodoList((oldList) => {
      let newList = [];
      oldList.forEach((listItem, index) => {
        if (index !== changeIndex) {
          newList.push(listItem);
        }
      });
      return newList;
    });
    setDeletingContent(false);
  }
  return (
    <div className={`${style.listItemContainer} ${item.isCompleted ? style.complete : style.incomplete}`} key={'list-item-' + index}>
      {!deletingContent && (
        <>
          {!editing && <div className={style.content}>{updatingContent ? 'Güncelleniyor...' : item.content}</div>}
          {editing && (
            <div className={style.editContainer}>
              <textarea type="text" value={editedValue} className={style.editContent} onChange={(e) => setEditedValue(e.target.value)} />
              <div className={style.editButtons}>
                <button
                  onClick={() => {
                    updateContent(index, editedValue);
                    setEditing(false);
                  }}
                >
                  Kaydet
                </button>
                <button
                  onClick={() => {
                    setEditedValue(item.content);
                    setEditing(false);
                  }}
                >
                  İptal
                </button>
              </div>
            </div>
          )}
          <div className={style.buttons}>
            <AiFillDelete className={style.icon} onClick={() => deleteContent(index)} />
            <AiFillEdit className={style.icon} onClick={() => setEditing(true)} />
            <div>
              <label htmlFor={'checkbox-' + index}>{updatingCompleted ? 'Güncelleniyor...' : 'Tamamlandı'}</label>
              <input
                type="checkbox"
                id={'checkbox-' + index}
                className={style.checkbox}
                checked={item.isCompleted}
                onChange={(e) => updateCompleted(index, e.target.checked)}
              />
            </div>
          </div>
        </>
      )}
      {deletingContent && <div>Siliniyor...</div>}
    </div>
  );
};

export default ListItem;
