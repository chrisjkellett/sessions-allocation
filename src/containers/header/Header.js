import React from 'react';
import classes from './Header.css';
import {NavLink} from 'react-router-dom';

const header = () => {
  return(
    <ul className={classes.Header}>
      <NavLink to='/' exact activeClassName={classes.Active}>
        <li>examiners</li>
      </NavLink>

      <NavLink to='/examiners/add' exact activeClassName={classes.Active}>
        <li>add examiner</li>
      </NavLink>

      <NavLink to='/venues' exact activeClassName={classes.Active}>
        <li>venues</li>
      </NavLink>
    </ul>
  )
} 


export default header;