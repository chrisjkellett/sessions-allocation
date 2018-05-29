import React from 'react';
import classes from './Input.css';

const Input = (props) => {
  let formElement = null;

  switch(props.elementtype){
    case 'select':
      formElement = (
        <select {...props.elementConfig}>
          {props.options.map(option => (
            <option>{option}</option>
          ))}
        </select>
        );
      break;
    default:
      formElement = <input {...props.elementConfig} />;
  }

  // if(!props.visible && props.id === 'ID_NUMBER'){
  //   styles.push(classes.NotVisible);
  // }

  // if(props.validation){
  //   styles.push(classes.Invalid)
  //   errorMessage = <span className={classes.Error}>{props.validation.error}</span>;
  // }


  return(
    <div className={classes.Input}>
      <label>{props.label}</label>
      {formElement}
    </div>
  )
}

export default Input;