import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Btns.css';

const editBtn = (props) => (
  <NavLink to={props.link} exact className={classes.Link}>
    <span>{props.label}</span>
  </NavLink>
)

export default editBtn;