import React from 'react';
import classes from './Input.css';

const Input = (props) => {
  let formElement = null;

  switch(props.elementtype){
    case 'select':
      formElement = (
        <select {...props.elementConfig} onChange={props.change} value={props.value}>
          {props.options.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
        );
      break;

    case 'checkbox':
      formElement = (
        props.options.map(option => {
          return (
            <div className={classes.Checkbox} key={option}>
              <label className={props.value.includes(option) ? classes.Active : null}>
                {option}
                <input type='checkbox' id={option} onChange={props.change} value={props.value}/>
              </label>
            </div>
          );
        })
      )
      break;
    default:
      formElement = <input {...props.elementConfig} onChange={props.change} value={props.value}/>;
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