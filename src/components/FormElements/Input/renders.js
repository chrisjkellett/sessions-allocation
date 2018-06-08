import React from 'react';
import classes from './Input.css';

export const renderFormElement = (type, props) =>{
  switch (type){
    case 'input' :
      return <input {...props.elementConfig} onChange={props.change} value={props.value}/>;

    case 'select' :
      return (
        <select {...props.elementConfig} onChange={props.change} value={props.value} >
          {props.options.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      )

    case 'checkbox' :
      return(
        <div>
        {props.options.map(option => {
          return (
            <div className={classes.Checkbox} key={option}>
              <label className={props.value.includes(option) ? classes.Active : null}>
                {option}
                <input type='checkbox' id={option} onChange={props.change} value={props.value}/>
              </label>
            </div>
          )
        })}
        </div>
      )

    case 'date' :
      return(
        <div className={classes.DateSelect}>
          <select onChange={(event, index) => props.change(event, 2)} value={props.value[2]} >
            {props.options.days.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select onChange={(event, index) => props.change(event, 1)}  value={props.value[1]} >
            {props.options.months.map(option => (
              <option key={option.m} id={option.id}>{option.m}</option>
            ))}
          </select>
          <select onChange={(event, index) => props.change(event, 0)}  value={props.value[0]} >
            {props.options.years.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      )

     default :
        return null; 

  }
}

export const renderErrorMessage = (props) => {
  if(props.valid && props.shouldValidate)
    return <span className={classes.ErrorMessage}>{props.valid[0]}</span>
  else
    return null;
}