import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.css';

export const renderExaminerViewLink = () => {
  return(
    <NavLink to='/' exact activeClassName={classes.Active}>
      <li>examiners</li>
    </NavLink>
  )
}

export const renderExaminerFormLink = (editing) => {
  if(editing)
    return <li>editing examiner</li>
  else
    return(
      <NavLink to='/add-examiner' exact activeClassName={classes.Active}>
        <li>add examiner</li>
      </NavLink>
    )
}