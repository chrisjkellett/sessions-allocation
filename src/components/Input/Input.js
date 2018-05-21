import React from 'react';
import classes from './Input.css';

const Input = (props) => {
  return(
    <div className={classes.Input}>
      <label>{props.id}</label>
      <input 
        type={props.type} 
        onChange={(event) => props.handler(event, props.id)} 
        defaultValue={props.value} />
    </div>
  )
}

export default Input;