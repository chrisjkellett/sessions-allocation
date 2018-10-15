import React from 'react';
import classes from './SingleItem.css';

const SingleItemForVenue = ({ label, venue }) => {
  return (
    <div className={classes.SingleItem}>
      <div className={classes.Label}>{label}</div>
      <div className={classes.Data}>
        <span>{venue.name}</span>
        <div className={classes.Sub}>{venue.address}</div>
      </div>
    </div>
  )
}

export default SingleItemForVenue;