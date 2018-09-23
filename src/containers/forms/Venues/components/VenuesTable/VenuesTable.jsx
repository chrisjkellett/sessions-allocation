import React from 'react';
import classes from '../../Venues.css';
import Table from '../../../../../components/FormElements/Table/Table';
import DeleteBtn from '../DeleteBtn/DeleteBtn';

const VenuesTable = ({ data, handlers }) => {
  return (
    <div className={classes.Box}>
      <Table labels={['name', 'contact', 'type', 'phone', null]}>
        {data.map(v => (
          <tr className={classes.Row} key={v.name}>
            <td>
              {v.name}
              <span>{v.address}</span>
            </td>
            <td>{v.contact}</td>
            <td>{v.type.join(" | ")}</td>
            <td>{v.phone !== '' ? '+34( ' + v.phone + ')' : '-' }</td>
            <td>
              <DeleteBtn deleteHandler={handlers.delete} name={v.name}/>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default VenuesTable;
