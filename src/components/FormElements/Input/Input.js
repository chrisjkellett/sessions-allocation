import React from 'react';
import classes from './Input.css';
import {formatLabel} from './utility';

const Input = (props) => {
  let styles = [classes.Input];
  let errorMessage;

  if(!props.visible && props.id === 'ID_NUMBER'){
    styles.push(classes.NotVisible);
  }

  if(props.validation){
    styles.push(classes.Invalid)
    errorMessage = <span className={classes.Error}>{props.validation.error}</span>;
  }


  return(
    <div className={styles.join(" ")} id={props.id}>
      <label>{formatLabel(props.id)}</label>
      {errorMessage}
      <input
          type={props.type ? props.type : 'text'} 
          onChange={(event) => props.handler(event, props.id.toLowerCase())} 
          defaultValue={props.value} />
    </div>
  )
}

export default Input;