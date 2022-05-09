/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ivega123.github.io/">
        Caio Vega
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
