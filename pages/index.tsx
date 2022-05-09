/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { SetStateAction, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Copyright from '@src/components/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: '#fff',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  logotypeImage: {
    width: 157.56,
    marginBottom: theme.spacing(4),
    display: 'flex',
    marginRight: 'auto',
  },
  ImageLogo: {
    width: '60%',
    height: '60%',
    top: '242px',
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    background: '#0138FE',
    borderRadius: '8px',
    color: 'white',
    textTransform: 'none',
  },
  cadastro: {
    margin: theme.spacing(1, 0, 1),
    background: 'white',
    borderRadius: '8px',
    color: '#0288D1',
    border: '1px solid #0288D1',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'white',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  },
  LoginTitle: {
    marginRight: 'auto',
    fontSize: 'normal',
    fontWeight: 'bold',
    lineHeight: '14px',
    color: '#3C3C66',
    marginTop: '15%',
    marginBottom: '5%',
  },
  ForgetPassword: {
    textAlign: 'right',
    marginBottom: '10%',
  },
  ForgetPasswordText: {
    color: '#0288D1',
  },
  TextField: {
    [`& fieldset`]: {
      borderRadius: 10,
      border: 'none',
    },
    background: '#F8F8F8',
    borderRadius: 8,
  },
  IconMail: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    textAlign: 'center',
    color: '#3B3C66',
  },
  margin: {
    margin: theme.spacing(1),
  },
  noBorder: {
    border: 'none',
  },
  gridP: {
    marginLeft: '10%',
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const router = useRouter();

  const [email, setEmail] = useState('');

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const query = `
    mutation Login($password: String!, $email: String!) {
      Login(password: $password, email: $email) {
        accessToken
      }
    }`;

    const variables = {
      email,
      password: values.password,
    };
    const id = toast.loading('Enviando Solicitação...');
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/graphql`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    });
    if (res.ok) {
      const response = await res.json();
      toast.update(id, { render: 'Logado!', type: 'success', isLoading: false, autoClose: 4000, closeOnClick: true });
      localStorage.setItem('accessToken', response.data.Login.accessToken);
      router.push('/Dashboard');
    } else {
      toast.update(id, {
        render: res.statusText,
        type: 'error',
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
      });
    }
  };

  const handleRedirect = async () => {
    router.push('/SignIn');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid className={classes.gridP} item xs={3} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.LoginTitle}>
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container direction="row">
              <Grid item xs={1} className={classes.IconMail}>
                <MailOutlineIcon />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  className={classes.TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Insira o seu E-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid item xs={1} className={classes.IconMail}>
                <LockOutlinedIcon />
              </Grid>
              <Grid item xs={11}>
                <FormControl className={clsx(classes.TextField)} variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    classes={{ notchedOutline: classes.noBorder }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container>
              <Grid className={classes.ForgetPassword} item xs>
                <Link className={classes.ForgetPasswordText} href="#" variant="body2">
                  Esqueci a senha
                </Link>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
              onClick={() => handleLogin()}
            >
              Entrar
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              size="large"
              className={classes.cadastro}
              onClick={() => handleRedirect()}
            >
              Fazer Cadastro
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Grid item xs={9} sm={4} md={7} className={classes.image}>
        <img src={require('../public/Login_Logo.svg')} className={classes.ImageLogo} />
      </Grid>
    </Grid>
  );
}
