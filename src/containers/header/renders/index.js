import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Header.css';
import * as routes from '../../../store/app-data/routes';
import {getLogData, formatError} from './utility';

export const renderExaminerViewLink = () => {
  return(
    <NavLink to={routes.EXAMINERS} exact activeClassName={classes.Active}>
      <li>
        <span>examiners</span>
      </li>
    </NavLink>
  )  
}

export const renderVenuesLink = () => {
  return(
    <NavLink to={routes.VENUES} exact activeClassName={classes.Active}>
      <li>
        <span>venues</span>
      </li>
    </NavLink>
  )  
}

export const renderSessionViewLink = () => {
  return(
    <NavLink to={routes.SESSIONS} exact activeClassName={classes.Active}>
      <li>
        <span>sessions</span>
      </li>
    </NavLink>
  )
}

export const renderLogout = (logout, user, isAuthenticated) => {
  return(
    <div className={classes.RightMenu}> 
      {/* {isAuthenticated && "[" + user + "]"} */}
      <li onClick={logout} className={classes.ActiveLink}>logout</li>
    </div>
  )
}

export const renderUpdateLog = (update, {type, action}) => {
  const data = getLogData(type, update);   
  return (
    <div className={classes.UpdateAlert}>
      <i className="far fa-check-circle"></i>
      <span className={classes.Action}>{action}</span>
      <b>{data.primary}</b>
      <span className={classes.Secondary}>{data.secondary}</span>
    </div>
  );
}

export const renderErrorLog = ({error}) => {  
  return (
    <div className={classes.ErrorAlert}>
      <i className="fas fa-exclamation-circle"></i>
      <span className={classes.Action}>{formatError(error)}</span>
    </div>
  );
}

export const renderUserBar = (user) => {  
  return (
    <div className={classes.UserBar}>
      <span className={classes.Action}>
        Logged in as {user}.
      </span>
    </div>
  );
}