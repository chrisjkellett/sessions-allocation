import React from 'react';
import classes from './Checkbox.css';

const Checkbox = (props) => {
  let styles = [];

  if(!props.visible && props.id === 'LEVELS'){
    styles.push(classes.NotVisible);
  }

  return(
    <div className={styles}>
      <label>{props.id.toLowerCase()}</label>
        <div className={classes.Checkbox}>
          {props.options.map(option => {
            return (
              <div key={option}>
                <label className={props.value.includes(option) ? classes.Active : null}>
                  {option}
                  <input 
                    type='checkbox' 
                    id={option}
                    onChange={(event) => props.handler(event, props.id.toLowerCase())}/>
                </label>
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default Checkbox;