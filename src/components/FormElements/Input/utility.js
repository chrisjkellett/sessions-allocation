import React from 'react';

export const formatLabel = (str) => {
  return str === undefined ? null : str.replace('_', ' ').toLowerCase();
}

export const generateFormElement = (type, props, classes) =>{
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
        props.options.map(option => {
          return (
            <div className={classes.Checkbox} key={option}>
              <label className={props.value.includes(option) ? classes.Active : null}>
                {option}
                <input type='checkbox' id={option} onChange={props.change} value={props.value}/>
              </label>
            </div>
          );
      }))

     default :
        return {}; 

  }
}

export const generateClasses = (props, classes) => {
  const styles = [classes.Input];

  if(!props.valid){
    styles.push(classes.Invalid);
  }

  return styles.join(" ");
}