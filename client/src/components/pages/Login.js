import Header from '../Header';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      username,
      password
    };

    const res = await fetch(
      'https://legassick-recipes.herokuapp.com/api/v1/auth/login',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }
    );
    const data = await res.json();
    console.log(data);
    // TODO - insert logic to only push to homepage after successful log in attempt
    history.push('/');
  };

  return (
    <div>
      <Header title='Login' />
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
};

export default Login;
