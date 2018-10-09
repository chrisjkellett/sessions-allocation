import React from 'react';
import classes from './Td.css';

const Td = ({ data, smallFont, subContent, type, isYLE }) => {
  const styles = smallFont ? classes.SmallFont : null;
  const isWritingOrYLESpeaking = type === 'Writing' || (type === 'Speaking' && isYLE)
  return (
    <td className={styles}>
      {type === undefined && data} 
      {type === 'array' && data.join(" | ")}  
      {type === 'Speaking' && !isYLE 
        && data.map((item, index) => index % 2 === 0 && 
        <div key={index} id={index} className={classes.ExaminerPair}>
          <span>{item} + </span>
          <span>{data[index + 1]}</span>
        </div>
        )
      }
      {isWritingOrYLESpeaking
        && data.map(item => <div key={item} className={classes.ExaminerPair}>{item}</div>)
      }
      {subContent && subContent}
    </td>
  )
}

export default Td;