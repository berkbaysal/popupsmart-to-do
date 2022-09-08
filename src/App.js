import { useEffect, useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import TopBar from './components/TopBar';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const [username, setUsername] = useState(null);
  const [todoList, setTodoList] = useState(null);

  function checkUserNameExists() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }

  useEffect(() => {
    checkUserNameExists();
  }, []);
  return (
    <div className="App">
      {!username && <WelcomeScreen setUsername={setUsername} />}
      {username && (
        <>
          <TopBar name={username} setTodoList={setTodoList} todoList={todoList} />
          <ToDoList todoList={todoList} setTodoList={setTodoList} />
        </>
      )}
    </div>
  );
}

export default App;
