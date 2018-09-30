import React from 'react';
import classes from './Table.css';

const Table = (props) => (
    <table className={classes.Table}>
      <thead>
        <tr className={classes.RowHeader}>
          {props.labels ? props.labels.map((label, i)=>(
            <th key={i}>{label === 'x' ? null : label}</th>
          )) : null}
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
)

export default Table;