import React from 'react';
import classes from './SingleItem.css';
import IconClasses from '../../../Tables/Td/TdIcons/TdIcons.css';

const SingleItem = ({ label, data, icons }) => {
  return (
    <div className={classes.SingleItem}>
      <div className={classes.Label}>{label}</div>
      {icons 
        ? <div className={classes.Data}>{data.map(item => <span className={IconClasses.Icons}>{item}</span>)}</div>
        : <div className={classes.Data}>{data}</div>
      }
    </div>
  )
}

export default SingleItem;