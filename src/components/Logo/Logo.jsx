import React from 'react'
import classes from './Logo.css';

const Logo = ({styles}) => {
  return (
    <div className={classes[styles]}>
      <span className={classes.Title}>examiner 
        <span>manager</span>
      </span>
    </div>
  )
}

export default Logo
