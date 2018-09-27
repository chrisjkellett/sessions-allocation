import React from 'react';
import classes from './Tr.css';

const Tr = ({ key, children }) => {
  return (
    <tr className={classes.Row} key={key}>
      {children}
    </tr>
  )
};

export default Tr;