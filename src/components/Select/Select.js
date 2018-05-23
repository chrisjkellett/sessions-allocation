import React from 'react';
import classes from './Select.css';

const Input = (props) => {
  const styles = [];

  if(props.date){
    styles.push(classes.DateSelect);
  }else{
    styles.push(classes.Select);
  }


  return(
    <div className={styles}>
      <label>{props.date ? null : props.id}</label>
      <select onChange={(event) => props.handler(event, props.id)} defaultValue={props.value}>
        {props.options.map(option => {
          return <option key={option}>{option}</option>
        })}
      </select>
    </div>
  )
}

export default Input;