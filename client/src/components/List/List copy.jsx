/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import style from './List.module.css';

export default function List() {
  const { users } = useSelector((state) => state.users);
  const rows = users.map((u) => ({ ...u, Edit: <EditOutlinedIcon/> }));
  //   [...users, Edit: 'EditOutlinedIcon'];
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'ФИО',
      description: 'Полное имя сотрудника',
      width: 160,
    },
    {
      field: 'jobTitle', headerName: 'Должность', width: 160,
    },
    {
      sortable: false,
      field: 'Edit',
      headerName: 'Изменить',
      width: 100,
    },
  ];

  return (
    <>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    </>
  );
}
