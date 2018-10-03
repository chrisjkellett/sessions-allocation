import React from 'react';
import classes from './Table.css';

const Table = ({ labels, children, limited }) => {
  const rowStyle = [classes.RowHeader];
  if(limited) rowStyle.push(classes.RowLimited)
  return (
    <div className={limited ? classes.LimitedTable : null}>
      <table className={classes.Table}>
        <thead>
          <tr className={rowStyle.join(" ")}>
            {labels && labels.map((label, i)=>(<th key={i}>{label}</th>))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )
};

export default Table;