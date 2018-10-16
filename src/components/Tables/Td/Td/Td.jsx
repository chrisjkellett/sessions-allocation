import React from 'react';
import classes from './Td.css';

const Td = ({ data, smallFont, subContent, type, isYLE, handler }) => {
  let styles = [];
  if(smallFont) styles.push(classes.SmallFont);
  if(handler) styles.push(classes.Link);
  
  const isWritingOrYLESpeaking = type === 'Writing' || (type === 'Speaking' && isYLE)

  return (
    <td className={styles.join(" ")}>
      {type === undefined && <div onClick={handler ? handler : null}>{data}</div>} 
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