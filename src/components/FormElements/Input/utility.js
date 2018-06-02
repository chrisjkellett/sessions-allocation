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

    case 'date' :
      return(
        <div className={classes.DateSelect}>
          <select onChange={(event, index) => props.change(event, 0)} value={props.value[0]} >
            {props.options.days.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select onChange={(event, index) => props.change(event, 1)}  value={props.value[1]} >
            {props.options.months.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select onChange={(event, index) => props.change(event, 2)}  value={props.value[2]} >
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

export const generateClasses = (props, classes) => {
  const styles = [classes.Input];

  if(!props.valid && props.validate){
    styles.push(classes.Invalid);
  }

  return styles.join(" ");
}