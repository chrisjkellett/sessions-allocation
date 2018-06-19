import React from 'react';
import classes from './Input.css';
import {formatLabel, generateClasses} from './utility';
import {renderErrorMessage, renderFormElement, renderAdditionalInfo} from './renders';

const Input = (props) => {
  return(
    <div className={generateClasses(props, classes)}>
      <label>{formatLabel(props.label)}</label>
      {renderAdditionalInfo(props.label, props.value)}
      {renderErrorMessage(props)}
      {renderFormElement(props.elementtype, props)}
    </div>
  )
}

export default Input;