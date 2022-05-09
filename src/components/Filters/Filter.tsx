/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24,
    marginTop: '2%',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    marginRight: 'auto',
    paddingLeft: '10%',
    paddingTop: '50%',
    paddingBottom: '15%',
  },
  title: {
    flexGrow: 1,
    color: '#0288D1',
    fontWeight: 700,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F6F7FC',
    '&:hover': {
      backgroundColor: '#F6F7FC',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0138FE',
  },
  inputRoot: {
    color: 'inherit',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formGroup: {
    display: 'initial',
  },
  formLegend: {
    color: '#0288D1',
    fontWeight: 500,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  checkBox: {
    color: '#0138FE',
    '&$checked': {
      color: '#0138FE',
    },
  },
}));
const BlueCheckbox = withStyles({
  root: {
    color: '#0138FE',
    '&$checked': {
      color: '#0138FE',
    },
  },
  checked: {},
  // eslint-disable-next-line react/jsx-props-no-spreading
})((props: any) => <Checkbox color="default" {...props} />);
export default function Filter() {
  const classes = useStyles();
  const [state, setState] = useState({
    nivel1: true,
    nivel2: false,
    aberto: false,
    analise: false,
  });
  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { nivel1, nivel2, aberto, analise } = state;
  return (
    <Grid container>
      <Grid item>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLegend}>
            Filtrar por nível
          </FormLabel>
          <FormGroup className={classes.formGroup}>
            <FormControlLabel
              control={
                <BlueCheckbox className={classes.checkBox} checked={nivel1} onChange={handleChange} name="nivel1" />
              }
              label="Nível 01"
            />
            <FormControlLabel
              control={
                <BlueCheckbox className={classes.checkBox} checked={nivel2} onChange={handleChange} name="nivel2" />
              }
              label="Nível 02"
            />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLegend}>
            Filtrar por status
          </FormLabel>
          <FormGroup className={classes.formGroup}>
            <FormControlLabel
              control={<BlueCheckbox checked={aberto} onChange={handleChange} name="aberto" />}
              label="Em aberto"
            />
            <FormControlLabel
              control={
                <BlueCheckbox className={classes.checkBox} checked={analise} onChange={handleChange} name="analise" />
              }
              label="Em análise"
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
