/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { DateTimePicker } from '@material-ui/pickers';
import { toast } from 'react-toastify';
import { User } from '../../models/User';

const useStyles = makeStyles(() => ({
  passoText: {
    color: '#0288D1',
  },
  headerDialog: {
    color: '#0288D1',
    fontWeight: 600,
    fontSize: '24px',
  },
  cancelButton: {
    textTransform: 'none',
    color: '#0288D1',
    borderColor: '#0288D1',
  },
  continueButton: {
    backgroundColor: '#0138FE',
    color: 'white',
    textTransform: 'none',
  },
  selectParam: {
    color: '#0138FE',
    fontSize: '14px',
  },
  select: {
    '&:before': {
      borderColor: '#EBEBEB',
    },
  },
  icon: {
    color: '#0138FE',
  },
  rulesText: {
    color: '#0288D1',
    fontWeight: 600,
    fontSize: '18px',
  },
}));
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ScheduleModal() {
  const [open, setOpen] = useState(false);

  const [Appointment, setAppointment] = useState<Date | null>(new Date());

  const [studentList, setStudentList] = useState<User[]>([]);

  const [student] = useState<User>();

  const [teacher] = useState<User>();

  const [studentId, setStudentId] = useState('');

  const [teacherId, setTeacherId] = useState('');

  const [teacherList, setTeacherList] = useState<User[]>([]);

  const getInitData = async (TeacherOrStudent: string) => {
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;

    const query = `query Query($where: UserWhereInput) {
            users(where: $where) {
              name
              email
              role
              id
            }
          }`;

    const variables = {
      where: {
        role: {
          in: TeacherOrStudent,
        },
      },
    };

    await fetch(`${process.env.NEXT_PUBLIC_HOST}/graphql`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: bearer,
      },
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (TeacherOrStudent === 'TEACHER') {
          setTeacherList(result.data.users);
        } else {
          setStudentList(result.data.users);
        }
      });
  };

  const handleInputChangeParam = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case 'Aluno':
        setStudentId(value);
        break;
      default:
        setTeacherId(value);
        break;
    }
  };

  const sendRequest = async () => {
    const id = toast.loading('Enviando Solicitação...');
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    const userIds = [];
    userIds.push(teacherId);
    userIds.push(studentId);
    const query = `
        mutation CreateSchedule($data: ScheduleCreateInput!) {
            createSchedule(data: $data) {
              appointment
              userIds
            }
          }`;

    const variables = {
      data: {
        appointment: Appointment,
        userIds: {
          set: userIds,
        },
      },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/graphql`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: bearer,
      },
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    });
    if (res.ok) {
      toast.update(id, {
        render: 'Apontamento Criado!',
        type: 'success',
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
      });
    } else {
      toast.update(id, {
        render: res.statusText,
        type: 'error',
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    handleClose();
  };

  const classes = useStyles();

  const handleClickOpen = async () => {
    await getInitData('TEACHER');
    await getInitData('STUDENT');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        color="primary"
        style={{
          fontSize: '12px',
          textTransform: 'none',
          marginRight: '10px',
          backgroundColor: '#E6E4F9',
          color: '#3860FE',
        }}
        onClick={handleClickOpen}
        variant="contained"
        startIcon={<AddIcon />}
        disableElevation
      >
        Criar Agendamento
      </Button>
      <Dialog fullWidth maxWidth="md" onClose={handleClose} aria-labelledby="rules-dialog" open={open}>
        <Grid style={{ padding: '24px' }}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Typography className={classes.headerDialog}>Criar Novo Agendamento</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={1}>
              <Grid item xs={8}>
                <DateTimePicker value={Appointment} onChange={setAppointment} />
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-label">Aluno</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="Aluno"
                    value={student?.name}
                    onChange={(e) => handleInputChangeParam(e)}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem value={student?.name}>Selecione o Aluno</MenuItem>
                    {studentList.map((param) => (
                      <MenuItem key={param.id} value={param.id}>
                        {param.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-label">Professor</InputLabel>
                  <Select
                    className={classes.select}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="Professor"
                    value={teacher?.name}
                    onChange={(e) => handleInputChangeParam(e)}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Selecione o Professor
                    </MenuItem>
                    {teacherList.map((param) => (
                      <MenuItem key={param.id} value={param.id}>
                        {param.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              size="large"
              className={classes.cancelButton}
              onClick={() => handleClose()}
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              autoFocus
              size="large"
              className={classes.continueButton}
              onClick={() => sendRequest()}
              variant="contained"
              disableElevation
            >
              Continuar
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}
