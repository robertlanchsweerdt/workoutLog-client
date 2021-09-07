import { useState, useEffect } from 'react';
import Auth from './Auth/Auth';
import Sitebar from './Home/Navbar';
import WorkoutIndex from './Workouts/WorkoutIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log('updateToken -->', newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem('token') ? (
      <WorkoutIndex token={sessionToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <div>
      <Sitebar clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;
