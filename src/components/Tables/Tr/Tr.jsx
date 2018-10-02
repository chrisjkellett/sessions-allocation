import React from 'react';
import classes from './Tr.css';

const Tr = ({ key, sessions, children }) => {
  const styles = sessions ? classes.SessionRow : classes.Row;
  return (
    <tr className={styles} key={key}>
      {children}
    </tr>
  )
};

export default Tr;