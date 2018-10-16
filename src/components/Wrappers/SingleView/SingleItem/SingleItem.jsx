import React from 'react';
import classes from './SingleItem.css';
import IconClasses from '../../../Tables/Td/TdIcons/TdIcons.css';
import moment from 'moment';

const SingleItem = ({ label, data, icons, isDate, array, shortDate }) => {
  const dateFormat = shortDate ? 'Do MMMM YYYY' : 'dddd Do MMMM YYYY'
  const content = isDate ?  data && moment(data, 'YYYYMMDD').format(dateFormat) : data;
  
  return (
    <div className={classes.SingleItem}>
      <div className={classes.Label}>{label}</div>
      {icons && 
        <div className={classes.Data}>{content ? content.map(item => <span className={IconClasses.Icons}>{item}</span>) : '-'}</div>}
      {array && 
        <div className={classes.Data}>{content ? content.map(item => <div className={classes.Sub}>{item}</div>) : '-'}</div>}
      {!icons && !array && 
        <div className={classes.Data}>{content ? content : '-'}</div>}
    </div>
  )
}

export default SingleItem;