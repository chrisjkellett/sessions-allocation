import React from 'react';
import classes from './KeyWrapper.css';

const KeyWrapper = ({children}) => {
  return (
    <li className={classes.KeyWrapper}>
      <span>
        {children}
      </span>
    </li>
  )
}

export default KeyWrapper;