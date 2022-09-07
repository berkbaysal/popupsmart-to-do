import { useEffect, useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';
import TopBar from './components/TopBar';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const [username, setUsername] = useState(null);

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
          <TopBar name={username} />
          <ToDoList />
        </>
      )}
    </div>
  );
}

export default App;
