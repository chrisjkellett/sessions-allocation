import React from 'react';
import classes from './Input.css';
import {formatLabel} from './utility';

const Input = (props) => {
  return(
    <div className={classes.Input}>
      <label>{formatLabel(props.id)}</label>
      <input
         type={props.type ? props.type : 'text'} 
          onChange={(event) => props.handler(event, props.id.toLowerCase())} 
          defaultValue={props.value} />
    </div>
  )
}

export default Input;