/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useDispatch, useSelector } from 'react-redux';
import style from './List.module.css';
import User from '../User/User.jsx';

import { fetchGetUsers } from '../redux/thunk/thunk';

export default function List() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const rows = users.sort((a, b) => a.id - b.id);
  useEffect(() => {
    dispatch(fetchGetUsers());
  }, [dispatch]);
  const columns = [
    {
      field: 'id', headerName: 'ID', width: 70, sortable: true,
    },
    {
      field: 'fullname',
      headerName: 'ФИО',
      description: 'Полное имя сотрудника',
      width: 160,
    },
    {
      field: 'jobTitle', headerName: 'Должность', width: 160,
    },
    {
      field: 'Edit',
      headerName: 'Изменить',
      width: 100,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">ФИО</TableCell>
            <TableCell align="center">Должность</TableCell>
            <TableCell align="center">Изменить</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="center">{row.fullname}</TableCell>
              <TableCell align="center">{row['Position.jobTitle']}</TableCell>
              <TableCell align="center"><User id={row.id}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}
