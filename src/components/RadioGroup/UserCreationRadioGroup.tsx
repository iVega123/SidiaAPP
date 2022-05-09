/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { Radio, RadioGroup, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  RadioText: {
    fontSize: 13,
  },
  RadioHeader: {
    fontSize: 13,
    fontWeight: 600,
    color: '#3860FE',
  },
  Radio: {
    color: '#3860FE',
    '&$checked': {
      color: '#3860FE !important',
    },
  },
  checked: {},
}));

interface FuncProps {
  handleCallback(childData: string): void;
}

export default function UserCreationRadioGroup(sendDataToParent: FuncProps) {
  const classes = useStyles();
  const [value, setValue] = useState('STUDENT');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  useEffect(() => {
    sendDataToParent.handleCallback(value);
  }, [sendDataToParent, value]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="role" name="role" value={value} onChange={handleChange}>
            <FormControlLabel
              value="STUDENT"
              control={
                <Radio
                  className={classes.Radio}
                  classes={{ root: classes.Radio, checked: classes.checked }}
                  size="small"
                />
              }
              label={<Typography className={classes.RadioText}>Estudante</Typography>}
            />
            <FormControlLabel
              value="TEACHER"
              control={
                <Radio
                  className={classes.Radio}
                  classes={{ root: classes.Radio, checked: classes.checked }}
                  size="small"
                />
              }
              label={<Typography className={classes.RadioText}>Professor</Typography>}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
