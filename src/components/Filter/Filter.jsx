import React from 'react';
import classes from './Filter.css';

const FilterBy = ({ label, filter, value }) => ((
  <div className={classes.HeaderFilter}>
    <input id={label} onChange={filter} placeholder={label} value={value} />
  </div>
));

export default FilterBy;