import React from 'react';
import classes from './Table.css';

const Table = ({ labels, children, limited }) => {
  return (
    <div className={limited ? classes.LimitedTable : classes.Table}>
      <table>
        <thead>
          <tr className={limited ? classes.RowHeaderLimited : classes.RowHeader}>
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