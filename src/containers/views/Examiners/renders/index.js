import React from 'react';
import classes from '../Examiners.css';
import Notification from '../../../../components/Misc/Notification';
import * as notificationTypes from '../../../../components/Misc/notificationTypes';
import {renderName, renderRoles, renderLevels, renderAvailability, renderBtns} from './sub-renders';

export const renderTableContent = (examiners, handleDelete, handleEdit, handleLink) => {
  if(examiners === null){
    return <Notification message={notificationTypes.LOADING} />
  }
  
  else if(examiners.length === 0){
    return <Notification message={notificationTypes.NO_RECORDS} />
  }

  else{
    return (
      examiners.map(examiner => (
        <tr className={classes.Row} key={examiner.name}>
          {renderName(examiner, handleLink)}
          {renderRoles(examiner, classes)}
          {renderAvailability(examiner, classes)}
          {renderLevels(examiner, classes)}
          {renderBtns(examiner, classes, handleDelete, handleEdit)}
        </tr>
    )))
  }
}