import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Header.css';
import {formatURL} from '../../../gen-utility';

export const renderExaminerViewLink = () => {
  return(
    <NavLink to='/' exact activeClassName={classes.Active}>
      <li>examiners</li>
    </NavLink>
  )
}

export const renderExaminerFormLink = (props) => {
  const {selectedExaminer, location} = props;
  if(selectedExaminer)
    if(location.pathname === '/' + formatURL(selectedExaminer.name)) 
      return <li>{location.pathname.substring(1, location.pathname.length)}</li>
    else{
      return <li>editing examiner</li>
    }
  else
    return(
      <NavLink to='/add-examiner' exact activeClassName={classes.Active}>
        <li>add examiner</li>
      </NavLink>
    )
}