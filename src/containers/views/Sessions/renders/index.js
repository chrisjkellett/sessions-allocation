import React from 'react';
import classes from '../Sessions.css';
import Notification from '../../../../components/Misc/Notification';
import {renderDate, renderTime, renderType, renderVenue, renderLevels, renderExaminers, renderSupport, renderBtns} from './sub-renders';
import * as notifications from '../../../../store/app-data/notifications';
import {generateFormElementArray} from '../../../forms/form-utility';
import {NETWORK_FAIL} from '../../../../store/app-data/errors';
import Input from '../../../../components/FormElements/Input/Input';
import UpdateSuccess from '../../../../components/Misc/UpdateSuccess/UpdateSuccess';
import {generateInputProps} from './utility';

export const renderTableContent = (sessions, handleDelete, handleEdit) => {
  if(sessions === null){
    return <Notification message={notifications.LOADING} />
  }
  
  else if(sessions.length === 0){
    return <Notification message={notifications.NO_RECORDS} />
  }

  else{
    return (
      sessions.map(session => (
        <tr className={classes.Row} key={session.id}>
          {renderDate(session)}
          {renderTime(session)}
          {renderType(session)}
          {renderVenue(session)}
          {renderLevels(session)}
          {renderExaminers(session)}
          {renderSupport(session)}
          {renderBtns(session, handleDelete, handleEdit)}
        </tr>
    )))
  }
}

export const renderError = (error) => {
  if(error){
    return <span className={classes.Error}>{NETWORK_FAIL}</span>
  }

  else 
    return null;
}

export const renderFormPeriod = (state, periodHandler, props) => {
  if(props.periods !== null && props.periods.length > 1){
    return (
      <div className={classes.PeriodSubNav}>
        {generateFormElementArray(state)
          .map(element =>{
            return <Input {...generateInputProps(element, periodHandler, props)} />
          }
        )}
        {renderUpdateSuccess()}
      </div>
    )
  };
}

export const renderUpdateSuccess = () => {
  return(
    <div className={classes.OuterSuccessDiv}>
      <UpdateSuccess />
    </div>
  )
}