import React from 'react';
import classes from './Input.css';
import {formatLabel} from './utility';

const Input = (props) => {
  let styles = [classes.Input];
  let error;

  if(!props.visible && props.id === 'ID_NUMBER'){
    styles.push(classes.NotVisible);
  }

  if(props.valid){
    const arr = props.valid.find(errorObj => {
      return errorObj.id === props.id.toLowerCase()
    })

    console.log(arr);

    if(arr){
      styles.push(classes.Invalid)
      error = <div className={classes.Error}>{arr.error}</div>;
    }
  }

  return(
    <div className={styles.join(" ")} id={props.id}>
      <label>{formatLabel(props.id)}</label>
      {error}
      <input
          type={props.type ? props.type : 'text'} 
          onChange={(event) => props.handler(event, props.id.toLowerCase())} 
          defaultValue={props.value} />
    </div>
  )
}

export default Input;