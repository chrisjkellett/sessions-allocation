import React from 'react';
import classes from './Logout.css';

const Logout = ({ logout }) => {
  return(
    <div className={classes.RightMenu}> 
      <li onClick={logout} className={classes.ActiveLink}>logout</li>
    </div>
  )
}

export default Logout;