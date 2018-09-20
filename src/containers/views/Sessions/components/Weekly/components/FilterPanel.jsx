import React from 'react';
import classes from '../../../Sessions.css';

const FilterPanel = ({ weeks, closeOptions, filterByWeek, sessions }) => {
  return (
    <span id="weeks-filter-panel">
      <div>
        <div>
          <span className={classes.SmallLabel}>filter by week beginning</span>
        </div>
        <div>
          {weeks.map(week => (
            <span key="week" className={classes.SmallLink} onClick={() => filterByWeek(sessions, week)}>{week}</span>
            )
          )}
          <span id="close-options-btn" className={classes.CloseFilter} onClick={closeOptions}>✖</span>
        </div>
      </div>
    </span>
  ) 
}

export default FilterPanel;