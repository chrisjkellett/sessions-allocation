import React from 'react';
import classes from './Checkbox.css';

const Checkbox = (props) => {
  return(
    <div>
      <label>{props.id.toLowerCase()}</label>
        <div className={classes.Checkbox}>
          {props.options.map(option => {
            return (
              <div key={option}>
                <label>
                  {option}
                  <input type='checkbox' id={option} onChange={(event) => props.handler(event, props.id.toLowerCase())}/>
                </label>
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default Checkbox;