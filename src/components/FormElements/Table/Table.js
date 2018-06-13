import React from 'react';
import classes from './Table.css';

const table = (props) => (
    <table>
      <thead>
        <tr className={classes.RowHeader}>
          {props.labels.map(label=>(
            <td key={label}>{label === 'x' ? null : label}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
)

export default table;