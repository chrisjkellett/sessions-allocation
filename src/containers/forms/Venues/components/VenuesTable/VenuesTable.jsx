import React from 'react';
import classes from '../../Venues.css';
import Table from '../../../../../components/FormElements/Table/Table';

const VenuesTable = ({ data }) => {
  return (
    <div className={classes.Box}>
      <Table labels={['name', 'type', 'phone']}>
        {data.map(v => (
          <tr className={classes.Row} key={v.name}>
            <td>
              {v.name}
              <span>{v.address}</span>
            </td>
            <td>{v.type}</td>
            <td>+34({v.phone})</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default VenuesTable;
