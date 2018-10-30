import React from 'react';
import classes from './Help.css';

const Help = ({ show }) => {
  return !show ? null :(
    <div className={classes.HelpContainer}>
      <div className={classes.Help}>
        Help!
      </div>
    </div>
  )
};

export default Help;