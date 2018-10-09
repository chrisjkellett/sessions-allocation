import React from 'react';
import moment from 'moment';
import classes from './TdDate.css';

const TdDate = ({ data, subContent, isSession }) => {
  return (
    <td>
      <div>{moment(data, 'YYYYMMDD').format('dddd Do MMMM')}</div>
      {isSession && 
        <div className={classes.SubContent}>
          <div>{subContent[0] + ' session @ ' + subContent[1]}</div>
          <div>{'Start time: ' + subContent[2]}</div>
        </div>
      }
    </td>
  )
};

export default TdDate;