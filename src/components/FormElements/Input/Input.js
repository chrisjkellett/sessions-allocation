import React from 'react';
import classes from './Input.css';
import {formatLabel, generateClasses} from './utility';
import {renderErrorMessageOrInfo, renderFormElement} from './renders';
import PostControls from './components/PostControls/PostControls';

const Input = (props) => {
  if(props.label === 'examiners'){
    console.log(props)
  }
  return(
    <div className={generateClasses(props, classes)}>
      <label>{formatLabel(props.label)}</label>
      {renderErrorMessageOrInfo(props)}
      {renderFormElement(props.elementtype, props)}
      <PostControls hasControls={props.hasControls}/>
    </div>
  )
}

export default Input;