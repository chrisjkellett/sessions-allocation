import React from 'react';
import classes from './Input.css';
import {formatLabel} from './utility';

const Input = (props) => {
  let styles = [classes.Input];

  if(!props.visible && props.id === 'ID_NUMBER'){
    styles.push(classes.NotVisible);
  }

  return(
    <div className={styles.join(" ")}>
      <label>{formatLabel(props.id)}</label>
      <input
          type={props.type ? props.type : 'text'} 
          onChange={(event) => props.handler(event, props.id.toLowerCase())} 
          defaultValue={props.value} />
    </div>
  )
}

export default Input;