import React from 'react';
import classes from './Select.css';

const Input = (props) => {
  return(
    <div className={classes.Select}>
      <label>{props.id}</label>
      <select onChange={(event) => props.handler(event, props.id)} defaultValue={props.value}>
        {props.options.map(option => {
          return <option key={option}>{option}</option>
        })}
      </select>
    </div>
  )
}

export default Input;