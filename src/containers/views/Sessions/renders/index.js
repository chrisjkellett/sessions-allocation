import React from 'react';
import classes from '../Sessions.css';
import Notification from '../../../../components/Misc/Notification';
import {
  renderDate, 
  renderTime, 
  renderType, 
  renderVenue, 
  renderLevels, 
  renderExaminers, 
  renderSupport, 
  renderStatus,
  renderBtns} from './sub-renders';
import * as notifications from '../../../../store/app-data/notifications';
import {generateFormElementArray} from '../../../forms/form-utility';
import Input from '../../../../components/FormElements/Input/Input';
import {generateInputProps} from './utility';

export const renderTableContent = (sessions, handleDelete, handleEdit, handleLink, isAuthenticated, user) => {
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
          {renderDate(session, handleLink)}
          {renderTime(session)}
          {renderType(session)}
          {renderVenue(session)}
          {renderLevels(session)}
          {renderExaminers(session)}
          {renderSupport(session)}
          {!isAuthenticated && renderStatus(session)}
          {isAuthenticated && renderBtns(session, handleDelete, handleEdit)}
        </tr>
    )))
  }
}

export const renderFormPeriod = (state, periodHandler, props, sessions) => {
  if(props.periods !== null && props.periods.length > 1){
    return (
      <div className={classes.PeriodSubNav}>
        {generateFormElementArray(state)
          .map(element =>{
            return <Input {...generateInputProps(element, periodHandler, props, sessions)} />
          }
        )}
      </div>
    )
  };
}