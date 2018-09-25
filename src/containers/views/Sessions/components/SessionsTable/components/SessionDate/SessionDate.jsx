import React from 'react';
import moment from 'moment';
import classes from './SessionDate.css';

const SessionDate = ({session, handleLink}) => {
  return (
    <td>
      <span className={classes.LinkToSingleView} onClick={()=> handleLink(session)}>
        {moment([...session.session_date].join("-")).format('dddd Do MMMM')}
      </span>
    </td>
  )
}

export default SessionDate;