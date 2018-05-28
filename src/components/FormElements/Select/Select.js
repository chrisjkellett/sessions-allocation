import React from 'react';
import classes from './Select.css';

const select = (props) => {
  const styles = [];

  if(props.date){
    styles.push(classes.DateSelect);
  }else{
    styles.push(classes.Select);
  }

  return(
    <div className={styles}>
      <label>{props.date ? null : props.id.toLowerCase()}</label>
      <select
        className={classes[props.id]} 
        onChange={(event) => props.handler(event, props.id.toLowerCase())} 
        defaultValue={props.value} 
        multiple={props.multiple}>

        {props.options.map(option => {
          return <option key={option}>{option}</option>
        })}
        
      </select>
    </div>
  )
}

export default select;