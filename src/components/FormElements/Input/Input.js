import React from 'react';
import classes from './Input.css';
import { generateFormElement, formatLabel } from './utility';

const Input = (props) => {

  return(
    <div className={classes.Input}>
      <label>{formatLabel(props.label)}</label>
      {generateFormElement(props.elementtype, props, classes)}
    </div>
  )
}

export default Input;