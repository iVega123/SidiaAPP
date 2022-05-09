/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { createStyles, createTheme, Theme } from '@material-ui/core/styles';
import { DataGrid, GridColDef, GridRowData } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import { format } from 'date-fns';
import { TableProps } from '@src/models/TableProps';

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        border: 0,
        color: theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
        background: 'white',
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-mainGridContainer': {
          backgroundColor: 'blue',
        },
        '& .MuiDataGrid-root': {
          borderColor: '#F5F5F5',
        },
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
          color: '#0138FE',
          borderRight: `0px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
        },
        '& .MuiDataGrid-cell': {
          color: theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0,
        },
      },
    }),
  { defaultTheme }
);
const columns: GridColDef[] = [
  {
    field: 'aluno',
    headerName: 'Aluno',
    headerClassName: 'header-table',
    headerAlign: 'center',
    width: 150,
    editable: false,
  },
  {
    field: 'professor',
    headerName: 'Professor',
    headerClassName: 'header-table',
    headerAlign: 'center',
    width: 150,
    editable: false,
  },
  {
    field: 'agendamento',
    headerName: 'Agendamento',
    headerClassName: 'header-table',
    headerAlign: 'center',
    width: 250,
    editable: false,
  },
];
export default function Appointments(props: TableProps) {
  const classes = useStyles();

  const { children } = props;

  const rows: GridRowData[] = [];

  children.forEach(function (element, idx) {
    let teacher;
    let student;
    element.user.forEach((u) => {
      if (u.role.toString() === 'TEACHER') {
        teacher = u.name;
      } else {
        student = u.name;
      }
    });
    const appointment = new Date(element.appointment);
    const row = {
      id: idx,
      agendamento: format(appointment, 'dd/MM/yyyy HH:mm'),
      aluno: student,
      professor: teacher,
    };
    rows.push(row);
  });

  console.log(children);

  useEffect(() => {}, [children]);

  return rows ? (
    <div style={{ height: 400, width: '100%' }} className={classes.root}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection={false} disableSelectionOnClick />
    </div>
  ) : (
    <div style={{ textAlign: 'center', padding: '15%' }}>
      <CircularProgress size={140} />
    </div>
  );
}
