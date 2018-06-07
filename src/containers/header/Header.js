import React from 'react';
import classes from './Header.css';
import {NavLink} from 'react-router-dom';

const header = () => {
  return(
    <ul className={classes.Header}>
      <NavLink to='/' exact activeClassName={classes.Active}>
        <li>examiners</li>
      </NavLink>

      <NavLink to='/add-examiner' exact activeClassName={classes.Active}>
        <li>add examiner</li>
      </NavLink>
    </ul>
  )
} 


export default header;