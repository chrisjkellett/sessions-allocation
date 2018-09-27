import React from 'react';
import classes from '../../Venues.css';
import DeleteBtn from '../../../../components/Btns/DeleteBtn/DeleteBtn';
import EditBtn from '../../../../components/Btns/EditBtn/EditBtn';
import { Table, Td, SubTd } from '../../../../components/Tables';

const VenuesTable = ({ data, handlers, isConfirming }) => {
  return (
    <div className={classes.Box}>
      <Table labels={['name', 'contact', 'type', 'phone', null]}>
        {data.map(v => (
          <tr className={classes.Row} key={v.name}>
            <Td data={v.name} subContent={<SubTd data={v.address} inline />} />
            <Td data={v.contact} />
            <Td data={v.type} />
            <Td data={v.phone} />
            <td>
              <EditBtn handler={handlers.editVenueHandler} id={v.id} />
              <span> | </span>
              <DeleteBtn handlers={handlers} data={v} isConfirming={isConfirming} />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default VenuesTable;
