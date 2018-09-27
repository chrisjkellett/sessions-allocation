import React from 'react';
import { EditDeletePanel } from '../../../../components/Btns';
import { Table, Td, Tr, SubTd } from '../../../../components/Tables';

const VenuesTable = ({ data, handlers, isConfirming }) => {
  return (
    <Table labels={['name', 'contact', 'type', 'phone', null]}>
      {data.map(v => (
        <Tr key={v.name}>
          <Td data={v.name} subContent={<SubTd data={v.address} inline />} />
          <Td data={v.contact} />
          <Td data={v.type} />
          <Td data={v.phone} />
          <EditDeletePanel handlers={handlers} data={v} isConfirming={isConfirming} />
        </Tr>
      ))}
    </Table>
  );
};

export default VenuesTable;
