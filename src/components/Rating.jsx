import React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Rating } from '@mui/material';

const theme = createTheme();

const useStyles = makeStyles(theme => {
  root: {
    // some css that access to theme
  }
});

const RatingComp = ({value}) => {
  return (
    <ThemeProvider theme={theme}>
    <Rating name="read-only" size="small" value={value} readOnly />
    </ThemeProvider>
  );
};

export default RatingComp;
