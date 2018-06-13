import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Header.css';
import {formatURL} from '../../../gen-utility';
import * as routes from '../../../store/app-data/routes';

export const renderExaminerViewLink = () => {
  return(
    <NavLink to={routes.EXAMINERS} exact activeClassName={classes.Active}>
      <li>examiners</li>
    </NavLink>
  )
}

export const renderExaminerFormLink = (props) => {
  const {selectedExaminer, location} = props;
  if(selectedExaminer)
    if(location.pathname === routes.EXAMINERS + formatURL(selectedExaminer.name)) 
      return <li>{formatURL(selectedExaminer.name)}</li>
    else
      return <li>editing examiner</li>
      
  else
    return(
      <NavLink to={routes.ADD_EXAMINER} exact activeClassName={classes.Active}>
        <li>add examiner</li>
      </NavLink>
    )
}

export const renderLogout = (user) => {
  return(
    <div className={classes.RightMenu}> 
      <NavLink to={routes.LOGIN_PAGE} exact activeClassName={classes.Active}>
        <li>logout</li>
      </NavLink>
    </div>
  )
}