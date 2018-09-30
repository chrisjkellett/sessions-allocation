import React from 'react';
import { EditDeletePanel } from '../../../../components/Btns';
import { Table, Td, Tr, SubTd } from '../../../../components/Tables';
import Filter from '../../../../components/Filter/Filter';
import IsNotEmpty from '../../../../components/Wrappers/IsNotEmpty/IsNotEmpty';

const VenuesTable = ({ data, filtered, handlers, isConfirming }) => {
  const venues = filtered === null ? data : filtered;
  const labels = ([
    <Filter label='name' filter={handlers.filter} />, 
    'contact', 
    <Filter label='type' filter={handlers.filter} />, 
    'phone', 
    null
  ]);

  return (
    <Table labels={labels}>
      <IsNotEmpty data={venues}>
        {venues.map(v => (
          <Tr key={v.name}>
            <Td data={v.name} subContent={<SubTd data={v.address} inline />} />
            <Td data={v.contact} />
            <Td data={v.type} />
            <Td data={v.phone} />
            <EditDeletePanel handlers={handlers} data={v} isConfirming={isConfirming} />
          </Tr>
        ))}
      </IsNotEmpty>
    </Table>
  );
};

export default VenuesTable;
