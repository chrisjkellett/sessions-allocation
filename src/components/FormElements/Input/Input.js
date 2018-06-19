import React from 'react';
import classes from './Input.css';
import {formatLabel, generateClasses} from './utility';
import {renderErrorMessageOrInfo, renderFormElement} from './renders';

const Input = (props) => {
  return(
    <div className={generateClasses(props, classes)}>
      <label>{formatLabel(props.label)}</label>
      {renderErrorMessageOrInfo(props)}
      {renderFormElement(props.elementtype, props)}
    </div>
  )
}

export default Input;