/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState, useRef } from 'react';

import {
  CssBaseline, Box, Container, TextField, Button, Alert, Stack, Typography,
} from '@mui/material';
import { fetchCreateUser } from '../redux/thunk/thunk';
import List from '../List/List.jsx';
import style from './App.module.css';

function App() {
  const { errorMsg, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [fullname, setNewFullname] = useState('');
  const [jobTitle, setNewJobTitle] = useState('');
  const [error, setError] = useState(false);
  const inputFN = useRef(null);
  const inputJT = useRef(null);
  useEffect(() => {
    const twice = users.find((name) => name.fullname === fullname);
    if (twice) {
      setError('Нельзя добавлять одного сотрудника дважды');
    }
  }, [fullname]);
  const addNewUser = async () => {
    const body = {
      fullname,
      jobTitle,
    };
    if (fullname && jobTitle) {
      setError(() => false);
      dispatch(fetchCreateUser(body));
      inputFN.current.querySelector('input').value = '';
      inputJT.current.querySelector('input').value = '';
      setNewFullname('');
      setNewJobTitle('');
    } else {
      setError(() => 'Все поля должны быть заполнены');
    }
  };
  return (
    <div className={style.App}>
      <Box className={style.box} sx={{ width: '100%', maxWidth: 500 }}>
        <Typography className={style.typography} variant="h2" gutterBottom>
          Раздел сотрудники
        </Typography>
      </Box>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& .MuiTextField-root': { width: '100%' },
            }}
          >
            <TextField
              className={style.TextField}
              onChange={(e) => setNewFullname(() => e.target.value)}
              onFocus={() => setError(() => false)}
              margin="normal"
              required
              label="ФИО"
              ref={inputFN}
            />
            <TextField
              className={style.TextField}
              onFocus={() => setError(() => false)}
              onChange={(e) => setNewJobTitle(() => e.target.value)}
              margin="normal"
              required
              id="outlined-required"
              label="Должность"
              ref={inputJT}
            />
            <Button
              variant="contained"
              color="success"
              onClick={addNewUser}
            >
              Добавить сотрудника
            </Button>
            {error
              ? <Stack
                className={style.error}
                sx={{ width: '100%' }}
                spacing={2}
              >
                <Alert severity="error">{error}</Alert>
              </Stack>
              : <div className={style.error}></div>
            }
          </Box>
          <List />
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
