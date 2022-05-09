/* eslint-disable react/no-children-prop */
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ScheduleModal from '@src/components/Modal/scheduleModal';
import UsersModal from '@src/components/Modal/usersModal';
import { Schedule } from '@src/models/Schedule';
import Appointments from '../src/components/Appointments';
import withAuth from './HOC/withAuth';

const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#FFF',
  },
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#FFF',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  analiseText: {
    color: '#6075B7',
  },
  amlText: {
    color: '#FFF',
  },
  ListItem: {
    color: '#FFF',
  },
  HistoryIcon: {
    textAlign: 'start',
    paddingLeft: '4%',
  },
  HistoryText: {
    color: '#0288D1',
    fontWeight: 600,
  },
  HistoryColor: {
    color: '#0288D1',
  },
}));

export default withAuth(function Dashboard() {
  const classes = useStyles();
  const [Loading, setLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
  const getSchedule = async () => {
    const query = `
    query Schedule {
      schedules {
        user {
          name
          role
        }
        updatedAt
        createdAt
        appointment
      }
    }`;
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/graphql`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: bearer,
      },
      method: 'POST',
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((result) => {
        setScheduleList(result.data.schedules);
        setLoading(true);
      });
  };
  useEffect(() => {
    getSchedule();
  }, [scheduleList]);
  return Loading ? (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Appointments children={scheduleList} />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={3}>
              <UsersModal />
            </Grid>
            <Grid item xs={3}>
              <ScheduleModal />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  ) : (
    <div style={{ textAlign: 'center', padding: '15%' }}>
      <CircularProgress size={140} />
    </div>
  );
});
