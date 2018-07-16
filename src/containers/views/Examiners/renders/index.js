import React from 'react';
import classes from '../Examiners.css';
import Notification from '../../../../components/Misc/Notification';
import * as notifications from '../../../../store/app-data/notifications';
import {renderName, renderRoles, renderLevels, renderAvailability, renderBtns} from './sub-renders';
import {filterForUser} from './utility';

export const renderTableContent = ({examiners, isAuthenticated, user}, handleDelete, handleEdit, handleLink) => {
  if(examiners === null){
    return <Notification message={notifications.LOADING} />
  }
  
  else if(examiners.length === 0){
    return <Notification message={notifications.NO_RECORDS} />
  }

  else{
    return (
      filterForUser(examiners, user, isAuthenticated).map(examiner => (
        <tr className={classes.Row} key={examiner.name}>
          {renderName(examiner, handleLink)}
          {renderRoles(examiner)}
          {renderAvailability(examiner)}
          {renderLevels(examiner)}
          {renderBtns(examiner, handleDelete, handleEdit, isAuthenticated)}
        </tr>
    )))
  }
}