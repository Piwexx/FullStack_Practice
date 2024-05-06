import { useState } from 'react';
import { login } from '../services/users/login';
import {setToken} from  '../helper/token'

export const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    login(username, password)
      .then((data) => {
        localStorage.setItem('user',
          JSON.stringify({
            name: data.name,
            username: data.username,
          })
        );
        setPassword('');
        setUserName('');
        setToken(data.token);
      })
      .catch((error) => {
        console.log(error)
        console.error('Error:', error);
      });
  };

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='userName'>User Name</label>s
          <input
            type='text'
            name={username}
            value={username}
            id='userName'
            onChange={handleChangeUserName}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name={password}
            value={password}
            id='password'
            onChange={handleChangePassword}
          />
        </div>
        <button>Login</button>
      </form>
    </>
  );
};
