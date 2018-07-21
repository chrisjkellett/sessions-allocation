import React from 'react';
import classes from './Table.css';

const table = (props) => (
    <table>
      <thead>
        <tr className={classes.RowHeader}>
          {props.labels.map((label, i)=>(
            <td key={i}>{label === 'x' ? null : label}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
)

export default table;