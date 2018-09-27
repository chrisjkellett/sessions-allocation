import React from 'react';
import { EditDeletePanel } from '../../../../components/Btns';
import { Table, Tr, Td, TdIcons, TdIconsForTime, SubTd } from '../../../../components/Tables';

const ExaminersTable = ({ data, handlers, isConfirming }) => {
  return (
    <Table labels={['name', 'levels', 'availability', null]}>
      {data.map(e => (
        <Tr key={e.name}>
          <Td data={e.name} subContent={<SubTd data={e.roles} />} />
          <TdIcons array={e.levels} />
          <TdIconsForTime array={e.availability} />
          <EditDeletePanel handlers={handlers} data={e} isConfirming={isConfirming} />
        </Tr>
      ))}
    </Table>
  );
};

export default ExaminersTable;
