/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { toast } from 'react-toastify';
import UserCreationRadioGroup from '../RadioGroup/UserCreationRadioGroup';

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

export default function UsersModal() {
  const [open, setOpen] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [NameValue, setNameValue] = useState('Novo Usuário');

  const [RulesData, setRulesData] = useState<string>('STUDENT');

  const [EmailValue, setEmailValue] = useState('');

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCallback = (childData: string) => {
    setRulesData(childData);
  };

  const sendRequest = async () => {
    const id = toast.loading('Enviando Solicitação...');
    const query = `
    mutation Register($role: String!, $password: String!, $email: String!, $name: String!) {
      Register(role: $role, password: $password, email: $email, name: $name)
    }`;

    const variables = {
      role: RulesData,
      password: values.password,
      email: EmailValue,
      name: NameValue,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/graphql`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    });
    if (res.ok) {
      toast.update(id, {
        render: 'Usuário Adicionado!',
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
  };

  const classes = useStyles();

  const handleClickOpen = () => {
    setActiveStep(0);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValues({
      password: '',
      showPassword: false,
    });
    setNameValue('');
    setEmailValue('');
  };
  const handleNextStep = async () => {
    if (activeStep === 1) {
      await sendRequest();
      handleClose();
    } else {
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    }
  };
  const handlePrevStep = () => {
    if (activeStep === 0) {
      handleClose();
    } else {
      setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    }
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
        Criar Usuário
      </Button>
      <Dialog fullWidth maxWidth="md" onClose={handleClose} aria-labelledby="rules-dialog" open={open}>
        {activeStep === 0 && (
          <Grid style={{ padding: '24px' }}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <Typography className={classes.passoText}>Passo 1 de 2</Typography>
              <Typography className={classes.headerDialog}>Criar Novo Usuário</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container direction="row">
                <Grid item xs={8}>
                  <TextField
                    style={{ marginTop: '20%', marginBottom: '30%', marginLeft: '2%' }}
                    fullWidth
                    value={NameValue}
                    onChange={(e: any) => setNameValue(e.target.value)}
                    id="rule-name"
                    label="Primeiro, defina um nome para o usuário"
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                size="large"
                className={classes.cancelButton}
                onClick={() => handlePrevStep()}
                variant="outlined"
              >
                Cancelar
              </Button>
              <Button
                autoFocus
                size="large"
                className={classes.continueButton}
                onClick={() => handleNextStep()}
                variant="contained"
                disableElevation
              >
                Continuar
              </Button>
            </DialogActions>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid style={{ padding: '24px' }}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <Typography className={classes.passoText}>Passo 2 de 2</Typography>
              <Typography className={classes.headerDialog}>Criar Novo Usuário</Typography>
              <Grid item xs={12}>
                <Grid spacing={0} container direction="row">
                  <Grid item style={{ alignSelf: 'center' }} xs={6}>
                    <Typography>Escolha um dos tipos de usuário:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <UserCreationRadioGroup handleCallback={handleCallback} />
                  </Grid>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={2} direction="column">
                    <Grid item xs={4}>
                      <Grid item xs={12}>
                        <TextField
                          name="value"
                          fullWidth
                          value={EmailValue}
                          onChange={(e: any) => setEmailValue(e.target.value)}
                          id="user-email"
                          label="Email"
                          variant="standard"
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                          <InputLabel htmlFor="password">Senha</InputLabel>
                          <Input
                            id="user-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
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
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid container direction="row-reverse">
                <Grid item xs={3} style={{ alignSelf: 'center' }}>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          autoFocus
                          size="large"
                          className={classes.cancelButton}
                          onClick={() => handlePrevStep()}
                          variant="outlined"
                        >
                          Voltar
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          autoFocus
                          size="large"
                          className={classes.continueButton}
                          onClick={() => handleNextStep()}
                          variant="contained"
                          disableElevation
                        >
                          Continuar
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5} />
              </Grid>
            </DialogActions>
          </Grid>
        )}
      </Dialog>
    </div>
  );
}
