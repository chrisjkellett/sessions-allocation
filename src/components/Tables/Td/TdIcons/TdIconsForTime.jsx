import React from 'react';
import classes from './TdIcons.css';
import { formatAvailability, isPm } from './utility';

const TdIconsForTime = ({ array }) => {
  return(
    <td>
      {array && formatAvailability(array)
          .map(day => {
            return <span key={day} className={[classes.Icons, classes.IconsLong].join(" ")}>
              {day.substring(0, 3)}
              <span>{isPm(day)}</span>
            </span>
        })}
    </td>
  )
}

export default TdIconsForTime;
