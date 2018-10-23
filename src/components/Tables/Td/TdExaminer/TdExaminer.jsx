import React from 'react';
import classes from '../Td/Td.css';

const Td = ({ data, type, isYLE }) => {
  console.log(data[0]);
  let styles = [classes.ExaminerPair];
  
  // const isWritingOrYLESpeaking = type === 'Writing' || (type === 'Speaking' && isYLE)

  return (
    <td className={styles.join(" ")}>
      {data.map((item, index) => index % 2 === 0 && 
        <div key={index} id={index} className={classes.ExaminerPair}>
          <span>{item.name} + </span>
          {data[index + 1] && <span>{data[index + 1].name}</span>}
        </div>
      )}
    </td>
  )
}

export default Td;