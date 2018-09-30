import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Header.css';
import {formatURL, formatDateURLPretty} from '../../../gen-utility';
import * as routes from '../../../store/app-data/routes';
import {getLogData, formatError} from './utility';

export const renderExaminerViewLink = () => {
  return(
    <NavLink to={routes.EXAMINERS} exact activeClassName={classes.Active}>
      <li>examiners</li>
    </NavLink>
  )  
}

export const renderVenuesLink = () => {
  return(
    <NavLink to={routes.VENUES} exact activeClassName={classes.Active}>
      <li>venues</li>
    </NavLink>
  )  
}

export const renderSingleExaminerViewLink = (user, examiner) => {
  return (
  <NavLink to={routes.EXAMINERS + formatURL(user)} exact activeClassName={classes.Active}>
    <li>{formatURL(user)}</li>
    </NavLink>
  )  
}

export const renderSessionViewLink = () => {
  return(
    <NavLink to={routes.SESSIONS} exact activeClassName={classes.Active}>
      <li>sessions</li>
    </NavLink>
  )
}

export const renderExaminerFormLink = ({history, match, selectedExaminer, location}) => {
  if(history.location.pathname.substring(0, 10) !== '/sessions/' && match.url !== '/venues/'){ 
    if(selectedExaminer)
      if(location.pathname === routes.EXAMINERS + formatURL(selectedExaminer.name)) 
        return <li>{formatURL(selectedExaminer.name)}</li>
      else
        return <li>{'[editing] ' + formatURL(selectedExaminer.name)}</li>
        
    else
      return(
        <NavLink to={routes.ADD_EXAMINER} exact activeClassName={classes.Active}>
          <li>add examiner</li>
        </NavLink>
      )
    }

  else
    return null;  
}

export const renderSessionFormLink = ({selectedSession, history, location, match}) => {
  if(history.location.pathname.substring(0, 11) !== '/examiners/' && match.url !== '/venues/'){ 
    if(selectedSession){
      const {venue, session_date} = selectedSession;
      const caption = formatDateURLPretty([...session_date]) + '@' + formatURL(venue)
      if(location.pathname === routes.SESSIONS + formatURL(venue) + '-' + formatDateURLPretty([...session_date])){ 
        return (
          <li>
            {caption} 
          </li>
        )
      }else
        return <li>{'[editing] ' + caption}</li>
        
    }else
      return(
        <NavLink to={routes.ADD_SESSION} exact activeClassName={classes.Active}>
          <li>add session</li>
        </NavLink>
      )
    }

  else
    return null;  
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