import React from 'react';
import classes from './Td.css';

const Td = ({ data, smallFont, subContent }) => {
  const styles = smallFont ? classes.SmallFont : null;
  return (
    <td className={styles}>
      {typeof data === 'object' 
        ? data.join(" | ")
        : data ? data : '-'
      }
      {subContent && subContent}
    </td>
  )
}

export default Td;