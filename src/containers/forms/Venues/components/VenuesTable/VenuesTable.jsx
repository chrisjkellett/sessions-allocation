import React from 'react';
import classes from '../../Venues.css';
import Table from '../../../../../components/FormElements/Table/Table';
import DeleteBtn from './DeleteBtn/DeleteBtn';

const VenuesTable = ({ data, handlers, isConfirming }) => {
  return (
    <div className={classes.Box}>
      <Table labels={['name', 'contact', 'type', 'phone', null]}>
        {data.map(v => (
          <tr className={classes.Row} key={v.name}>
            <td>
              {v.name}
              <span className={classes.Address}>{v.address}</span>
            </td>
            <td>{v.contact}</td>
            <td>{v.type.join(" | ")}</td>
            <td>{v.phone !== '' ? '+34( ' + v.phone + ')' : '-' }</td>
            <td>
              edit
              <span> | </span>
              <DeleteBtn handlers={handlers} venue={v} isConfirming={isConfirming} />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default VenuesTable;
