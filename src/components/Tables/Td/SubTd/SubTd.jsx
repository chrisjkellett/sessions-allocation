import React from 'react';
import classes from './SubTd.css';

const SubTd = ({ array }) => {
  return (
    <div>{array.map(item => <span key={item} className={classes.Roles}>{item}</span>)}</div>
  )
}



export default SubTd;