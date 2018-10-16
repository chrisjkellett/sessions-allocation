import React from 'react';
import classes from './SingleItem.css';
import IconClasses from '../../../Tables/Td/TdIcons/TdIcons.css';
import { formatAvailability, isPm } from '../../../Tables/Td/TdIcons/utility';

const SingleItem = ({ label, data }) => {
  const styles = [IconClasses.Icons, IconClasses.IconsLong];

  return (
    <div className={classes.SingleItem}>
      <div className={classes.Label}>{label}</div>
      <div className={classes.Data}>
        {formatAvailability(data)
          .map(day => {
            return <span key={day} className={styles.join(" ")}>
              {day.substring(0, 3)}
              <span>{isPm(day)}</span>
            </span>
        })}
        </div>
    </div>
  )
}

export default SingleItem;