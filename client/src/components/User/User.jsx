/* eslint-disable no-unused-vars */
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateUser, fetchUserDel } from '../redux/thunk/thunk';

export default function User({ id }) {
  const dispatch = useDispatch();
  const { users, webApi } = useSelector((state) => state.users);
  const user = users.filter((u) => u.id === id)[0];
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [fullname, setFullname] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [errorFN, setErrorFN] = useState(false);
  const [errorJT, setErrorJT] = useState(false);

  useEffect(() => {
    const twice = users.find((name) => name.fullname === fullname);
    let check;
    if (twice) {
      check = twice.id !== id;
    }
    if (!fullname) {
      setErrorFN('поле ФИО не может быть пустым');
    } if (check) {
      setErrorFN('Нельзя добавлять одного сотрудника дважды');
    } else {
      setErrorFN(false);
    }
  }, [fullname]);
  useEffect(() => {
    if (jobTitle) {
      setErrorJT(false);
    } else {
      setErrorJT(true);
    }
  }, [jobTitle]);

  const handleClickOpen = () => {
    setFullname(() => user.fullname);
    setJobTitle(() => user['Position.jobTitle']);
    setOpen(true);
  };

  const handleSaveClose = () => {
    setOpen(false);
    setFullname(() => '');
    setJobTitle(() => '');
    const body = {
      id, fullname, jobTitle,
    };

    dispatch(fetchUpdateUser(body));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDelYes = () => {
    setOpenDel(false);
    const body = {
      id,
      webApi,
    };
    dispatch(fetchUserDel(body));
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };
  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        aria-label="edit" component="label"
      >
        <EditOutlinedIcon />
      </IconButton>
      <IconButton
        onClick={handleClickOpenDel}
        aria-label="edit" component="label"
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
      {openDel
        ? <Dialog open={openDel} onClose={handleCloseDel}>
          <DialogTitle>Удаление</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Вы действитeльно хотите удалить сотрудника #{id} из списка?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelYes}>Да</Button>
            <Button onClick={handleCloseDel}>Отмена</Button>
          </DialogActions>
        </Dialog>
        : <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Редактирование</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Вы действитeльно хотите изменить данные сотрудника #{id}?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="ФИО"
              type="text"
              defaultValue={user.fullname}
              onChange={(e) => { setFullname(() => e.target.value); }}
              fullWidth
              variant="standard"
            />
            {errorFN
              ? <label style={{ color: 'red' }}>{errorFN}</label>
              : <></>
            }
            <TextField
              margin="dense"
              id="name"
              label="Должность"
              type="text"
              defaultValue={user['Position.jobTitle']}
              onChange={(e) => { setJobTitle(() => e.target.value); }}
              fullWidth
              variant="standard"
            />
            {errorJT
              ? <label style={{ color: 'red' }}>поле Должность не может быть пустым</label>
              : <></>
            }
          </DialogContent>
          <DialogActions>
            {errorFN
              ? <Button disabled>Записать</Button>
              : <Button onClick={handleSaveClose}>Записать</Button>
            }
            <Button onClick={handleClose}>Проверю</Button>
          </DialogActions>
        </Dialog>
      }

    </>
  );
}
