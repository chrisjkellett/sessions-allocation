import React from 'react';
import classes from './AsyncLoad.css';

const AsyncLoad = ({ children, waitFor, error }) => {
  console.log(error)
  if(error)
    return (
      <div className={classes.Error}>
        <i class="fas fa-exclamation-triangle"></i>
        <span>An error has occured while {error.action} {error.type} from database - try refreshing the page or contact support</span>
      </div>
    )
  else if(waitFor === null)
    return <div className={classes.Loading}>Loading</div> 
  else
    return children 
}

export default AsyncLoad
