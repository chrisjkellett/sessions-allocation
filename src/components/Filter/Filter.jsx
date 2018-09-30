import React from 'react';
import classes from './Filter.css';

const FilterBy = ({ label, filter }) => ((
  <div className={classes.HeaderFilter}>
    <input onChange={filter} placeholder={label} />
  </div>
));

export default FilterBy;