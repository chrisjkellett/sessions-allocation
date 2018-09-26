import React from 'react';
import classes from './FilterBy.css';

const FilterBy = ({ label, filter }) => ((
  <div className={classes.HeaderFilter}>
    <input onChange={filter} />
  </div>
));

export default FilterBy;