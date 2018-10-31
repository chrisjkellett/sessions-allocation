import React from 'react'
import classes from './Logo.css';

const Logo = ({header}) => {
  const styles = [classes.Logo]
  if(header) styles.push(classes.Header)
  
  return (
    <div className={styles.join(" ")}>
      <span className={classes.Title}>examiner 
        <span>manager</span>
        <span className={classes.Sub}>version 1.0</span>
      </span>
    </div>
  )
}

export default Logo
