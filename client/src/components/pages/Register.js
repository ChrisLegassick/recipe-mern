import Header from '../Header';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      name,
      username,
      email,
      password
    };

    const res = await fetch(
      'https://legassick-recipes.herokuapp.com/api/v1/auth/register',
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
      <Link to='/'>Go back</Link>
      <Header title='Register' />
      <form onSubmit={onSubmit}>
        <label className='flex flex-col mb-6'>
          Name:
          <input
            className='my-2'
            type='text'
            required
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </label>
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
          Email:
          <input
            className='my-2'
            type='email'
            required
            value={email}
            onChange={e => {
              setEmail(e.target.value);
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
        <input type='submit' value='Register' className='bg-green-400' />
      </form>
    </div>
  );
};

export default Register;
