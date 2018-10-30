import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Link.css';

const Link = ({route, isAuthenticated}) => {
  return !isAuthenticated ? null :(
    <NavLink to={route} exact activeClassName={classes.Active}>
      <li>
        <span>{route.replace(/\//g, "")}</span>
      </li>
    </NavLink>
  )
}

export default Link;