import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Header.css';
import {formatURL} from '../../../gen-utility';

export const renderExaminerViewLink = () => {
  return(
    <NavLink to='/examiners' exact activeClassName={classes.Active}>
      <li>examiners</li>
    </NavLink>
  )
}

export const renderExaminerFormLink = (props) => {
  const {selectedExaminer, location} = props;
  if(selectedExaminer)
    if(location.pathname === '/examiners/' + formatURL(selectedExaminer.name)) 
      return <li>{formatURL(selectedExaminer.name)}</li>
    else{
      return <li>editing examiner</li>
    }
  else
    return(
      <NavLink to='/examiners/add' exact activeClassName={classes.Active}>
        <li>add examiner</li>
      </NavLink>
    )
}