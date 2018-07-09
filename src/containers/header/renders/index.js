import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from '../Header.css';
import {formatURL} from '../../../gen-utility';
import * as routes from '../../../store/app-data/routes';
import moment from 'moment';

export const renderExaminerViewLink = () => {
  return(
    <NavLink to={routes.EXAMINERS} exact activeClassName={classes.Active}>
      <li>examiners</li>
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

export const renderExaminerFormLink = (props) => {
  if(props.history.location.pathname.substring(0, 10) !== '/sessions/'){ 
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

  else
    return null;  
}

export const renderSessionFormLink = (props) => {
  if(props.history.location.pathname.substring(0, 11) !== '/examiners/'){ 
    const {selectedSession} = props;
    if(selectedSession)
      // if(location.pathname === routes.SESSIONS + formatDateURL(selectedSession.session_date)) 
      //   return <li>{formatDateURL(selectedSession.session_date)}</li>
      // else
        return <li>editing session</li>
        
    else
      return(
        <NavLink to={routes.ADD_SESSION} exact activeClassName={classes.Active}>
          <li>add session</li>
        </NavLink>
      )
    }

  else
    return null;  
}

export const renderLogout = (props) => {
  return(
    <div className={classes.RightMenu}> 
      <NavLink to={routes.LOGIN_PAGE} exact activeClassName={classes.Active}>
        <li>logout</li>
      </NavLink>
    </div>
  )
}

export const renderUpdateLog = (update, map) => {
  if(update === null)
    return null;

  if(map.type === 'session'){
    let string = '';
    const formattedDate = moment(update.session_date.join("-")).format('dddd Do MMMM');

    if(map.action === 'update')
      string = 'updated session (' + formattedDate + ')';
    if(map.action === 'delete')
      string = 'deleted session (' + formattedDate + ')';
    if(map.action === 'add')
      string = 'added session (' + formattedDate + ')';
    
    return <div className={classes.UpdateAlert}>{string}</div>

  }

}