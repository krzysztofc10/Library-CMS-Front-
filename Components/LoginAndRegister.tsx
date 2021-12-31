import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { postLogin } from '../API/postLogin.tsx';
import { postRegister } from '../API/postRegister.tsx';
import styles from '../styles/login.module.css';

export const LoginAndRegister = ({ loginFunc }) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const SubmitLogBtn = async () => {
    const res = await postLogin(Username, Password);
    localStorage.setItem('token', res.data.accessToken);
    loginFunc(res.data.accessToken);
  };

  const SubmitRegBtn = async () => {
    const res = await postRegister(FirstName, LastName, Username, Password, 'customer');
    if (res.status === 201) {
      setTimeout(() => setRegister(!register), 1000);
    }
  };

  const registerFunc = () => {
    setRegister(!register);
  };

  return (
    <div>
      {!register ? (
        <Paper elevation={15}>
          <div className={styles.login}>
            <h1 className={styles.loginHeader}>Login</h1>
            <TextField
              label="Email"
              type="text"
              className={styles.loginTextField1}
              autoComplete="current-password"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              className={styles.loginTextField2}
              autoComplete="current-password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={() => registerFunc()}
              variant="contained"
              color="secondary"
              className={styles.loginButton1}
            >
              Register
            </Button>
            <Button
              onClick={() => SubmitLogBtn()}
              variant="contained"
              color="secondary"
              className={styles.loginButton2}
            >
              Submit
            </Button>
          </div>
        </Paper>
      ) : (
        <Paper elevation={15}>
          <div className={styles.register}>
            <h1 className={styles.registerHeader}>Register</h1>
            <TextField
              label="First Name"
              type="text"
              autoComplete="current-password"
              value={FirstName}
              className={styles.registerTextField1}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              type="text"
              autoComplete="current-password"
              value={LastName}
              className={styles.registerTextField2}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Email"
              type="text"
              autoComplete="current-password"
              value={Username}
              className={styles.registerTextField3}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              value={Password}
              className={styles.registerTextField4}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={() => registerFunc()}
              variant="contained"
              color="secondary"
              className={styles.registerButton1}
            >
              Login
            </Button>
            <Button
              onClick={() => SubmitRegBtn()}
              variant="contained"
              color="secondary"
              className={styles.registerButton2}
            >
              Submit
            </Button>
          </div>
        </Paper>
      )}
    </div>
  );
};