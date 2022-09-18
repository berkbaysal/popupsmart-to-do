import { useEffect, useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import TopBar from './components/TopBar';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const [username, setUsername] = useState(null);
  const [todoList, setTodoList] = useState(null);
  const [darkmode, setDarkMode] = useState(false);

  function checkUserNameExists() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }

  function checkDarkModePreference() {
    const darkModePreference = localStorage.getItem('darkmode');
    if (darkModePreference && darkModePreference === 'true') setDarkMode(true);
  }

  function toggleDarkMode() {
    setDarkMode((currentValue) => {
      localStorage.setItem('darkmode', !currentValue);
      return !currentValue;
    });
  }

  useEffect(() => {
    checkUserNameExists();
  }, []);
  return (
    <div className="App" style={{ backgroundColor: darkmode ? '#222' : 'white', color: darkmode ? 'white' : 'black' }}>
      {!username && <WelcomeScreen setUsername={setUsername} />}
      {username && (
        <>
          <TopBar name={username} setTodoList={setTodoList} todoList={todoList} toggleDarkMode={toggleDarkMode} darkmode={darkmode} />
          <ToDoList todoList={todoList} setTodoList={setTodoList} />
        </>
      )}
    </div>
  );
}

export default App;
