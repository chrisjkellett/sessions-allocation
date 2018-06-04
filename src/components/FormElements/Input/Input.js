import React from 'react';
import classes from './Input.css';
import { generateFormElement, formatLabel, generateClasses, generateErrorMessage } from './utility';

const Input = (props) => {
  return(
    <div className={generateClasses(props, classes)}>
      <label>{formatLabel(props.label)}</label>
      {generateErrorMessage(props, classes)}
      {generateFormElement(props.elementtype, props, classes)}
    </div>
  )
}

export default Input;