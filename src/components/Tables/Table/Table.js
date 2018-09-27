import React from 'react';
import classes from './Table.css';

const Table = (props) => (
    <table>
      <thead>
        <tr className={classes.RowHeader}>
          {props.labels ? props.labels.map((label, i)=>(
            <td key={i}>{label === 'x' ? null : label}</td>
          )) : null}
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
)

export default Table;