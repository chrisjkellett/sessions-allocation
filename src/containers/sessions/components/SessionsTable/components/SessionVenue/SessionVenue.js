import React from 'react';
import classes from './SessionVenue.css';

const SessionVenue = ({ session, venues }) => {
  const isSupportedVenue = venues.find(v => v.name === session.venue) !== undefined;
  const style = isSupportedVenue ? [classes.Success] : classes.Danger;
  
  return(
    <td className={style}>
      <div className={classes.Venue}>{session.venue && session.venue}</div>
      {!isSupportedVenue && <div className={classes.Error}>not found in venue database</div>}
    </td>
  )
}

export default SessionVenue;