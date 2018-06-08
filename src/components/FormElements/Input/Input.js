import React from 'react';
import classes from './Input.css';
import {formatLabel, generateClasses} from './utility';
import {renderErrorMessage, renderFormElement} from './renders';

const Input = (props) => {
  console.log(props);
  return(
    <div className={generateClasses(props, classes)}>
      <label>{formatLabel(props.label)}</label>
      {renderErrorMessage(props)}
      {renderFormElement(props.elementtype, props)}
    </div>
  )
}

export default Input;