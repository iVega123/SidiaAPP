/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../styles/theme';
import '../styles/globals.css';
import MenuSelector from '@src/components/MenuSelector';
import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = !(router.pathname === '/' || '/SignIn');
  return (
    <>
      <Head>
        <title>APP Sidia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          {showHeader ? (
            <Grid container>
              <Grid item xs={2}>
                <MenuSelector />
              </Grid>
              <Grid item xs={10}>
                <Component {...pageProps} />
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={12}>
                <Component {...pageProps} />
              </Grid>
            </Grid>
          )}
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default MyApp;
