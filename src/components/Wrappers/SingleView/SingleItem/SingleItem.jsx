import React from 'react';
import classes from './SingleItem.css';
import IconClasses from '../../../Tables/Td/TdIcons/TdIcons.css';
import moment from 'moment';

const SingleItem = ({ label, data, icons, isDate, array }) => {
  const content = isDate ?  moment(data, 'YYYYMMDD').format('dddd Do MMMM YYYY') : data;
  return (
    <div className={classes.SingleItem}>
      <div className={classes.Label}>{label}</div>
      {icons && 
        <div className={classes.Data}>{content.map(item => <span className={IconClasses.Icons}>{item}</span>)}</div>}
      {array && 
        <div className={classes.Data}>{content.map(item => <div className={classes.Sub}>{item}</div>)}</div>}
      {!icons && !array && 
        <div className={classes.Data}>{content}</div>}
    </div>
  )
}

export default SingleItem;