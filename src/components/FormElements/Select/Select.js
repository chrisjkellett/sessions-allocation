import React from 'react';
import classes from './Select.css';

const select = (props) => {
  const styles = [];
  let error;

  if(props.date){
    styles.push(classes.DateSelect);
  }else{
    styles.push(classes.Select);
  }

  if(props.valid){
    const arr = props.valid.find(errorObj => {
      return errorObj.id === props.id.toLowerCase()
    })

    console.log(arr);

    if(arr){
      styles.push(classes.Invalid)
      error = <span className={classes.Error}>{arr.error}</span>;
    }
  }

  return(
    <div className={styles.join(" ")}>
      <label>{props.date ? null : props.id.toLowerCase()}</label>
      {error}
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