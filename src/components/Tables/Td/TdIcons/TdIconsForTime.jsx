import React from 'react';
import classes from './TdIcons.css';
import { formatAvailability, isPm } from './utility';

const TdIconsForTime = ({ array, noBorders }) => {
  const styles = [classes.Icons, classes.IconsLong];
  if(noBorders) styles.push(classes.NoBorders);
  
  return(
    <td>
      {array && formatAvailability(array)
          .map(day => {
            return <span key={day} className={styles.join(" ")}>
              {day.substring(0, 3)}
              <span>{isPm(day)}</span>
            </span>
        })}
    </td>
  )
}

export default TdIconsForTime;
