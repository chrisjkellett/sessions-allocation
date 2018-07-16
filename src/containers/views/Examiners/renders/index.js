import React from 'react';
import classes from '../Examiners.css';
import Notification from '../../../../components/Misc/Notification';
import * as notifications from '../../../../store/app-data/notifications';
import {renderName, renderRoles, renderLevels, renderAvailability, renderBtns} from './sub-renders';

export const renderTableContent = ({examiners}, handleDelete, handleEdit, handleLink) => {
  if(examiners === null){
    return <Notification message={notifications.LOADING} />
  }
  
  else if(examiners.length === 0){
    return <Notification message={notifications.NO_RECORDS} />
  }

  else{
    return (
      examiners.map(examiner => (
        <tr className={classes.Row} key={examiner.name}>
          {renderName(examiner, handleLink)}
          {renderRoles(examiner)}
          {renderAvailability(examiner)}
          {renderLevels(examiner)}
          {renderBtns(examiner, handleDelete, handleEdit)}
        </tr>
    )))
  }
}