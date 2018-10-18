import React from 'react';
import classes from './Pairings.css';

const Pairings = ({ examiners, handler }) => {
  return (
    examiners.map((item, index) => index % 2 === 0 && 
      <div key={index} id={index} className={classes.ExaminerPair}>
        <span className={classes.Single} key={item.name} onClick={() => handler(index)}>{item.name}</span>
        <span>+</span>
        <span className={classes.Single} key={examiners[index + 1]} onClick={() => handler(index + 1)}>{examiners[index + 1].name}</span>
      </div>
    )
  )
}

export default Pairings;