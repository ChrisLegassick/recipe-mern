import './App.css';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      username,
      password
    };

    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    console.log(data);

    checkUser();
  };

  const checkUser = async () => {
    const res = await fetch('/api/v1/auth/me', {
      method: 'GET',
      credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Hello</h1>
      <form onSubmit={onSubmit}>
        <label className='flex flex-col mb-6'>
          Username:
          <input
            className='my-2'
            type='text'
            required
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label className='flex flex-col mb-6'>
          Password:
          <input
            className='my-2'
            type='password'
            required
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <input type='submit' value='Login' className='bg-green-400' />
      </form>
    </div>
  );
}

export default App;
