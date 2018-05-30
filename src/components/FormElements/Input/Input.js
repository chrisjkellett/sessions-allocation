import React from 'react';
import classes from './Input.css';
import { generateFormElement, formatLabel, generateClasses } from './utility';

const Input = (props) => {
  return(
    <div className={generateClasses(props, classes)}>
      <label>{formatLabel(props.label)}</label>
      {generateFormElement(props.elementtype, props, classes)}
    </div>
  )
}

export default Input;