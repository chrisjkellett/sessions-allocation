import React from 'react';
import classes from '../Weekly.css';
import * as $ from './utility';

const FilterPanel = ({ weeks, closeOptions, filterByWeek, sessions, weekFilteredBy, archived, showAll }) => {
  return (
    <div id="weeks-filter-panel" className={classes.FilterPanel}>
      <div>
        <div>
          {weeks.map(week => (
            <span key={week} className={$.setClasses(week, weekFilteredBy)} onClick={() => filterByWeek(showAll ? archived : sessions, week)}>{week}</span>
            )
          )}
          <span id="close-options-btn" className={classes.CloseFilter} onClick={closeOptions}>✖</span>
        </div>
      </div>
    </div>
  ) 
}

export default FilterPanel;