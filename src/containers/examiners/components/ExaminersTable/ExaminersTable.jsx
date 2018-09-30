import React from 'react';
import { EditDeletePanel } from '../../../../components/Btns';
import { Table, Tr, Td, TdIcons, TdIconsForTime, SubTd } from '../../../../components/Tables';
import Filter from '../../../../components/Filter/Filter';

const ExaminersTable = ({ data, filtered, handlers, isConfirming }) => {
  const examiners = filtered === null ? data : filtered;
  return (
    <Table labels={[
      <Filter label='name' filter={handlers.filter} />, 
      <Filter label='levels' filter={handlers.filter} />, 
      'availability', 
      null]} >
      {examiners.length === 0 
        ? 'No records found'
        : examiners.map(e => (
        <Tr key={e.name}>
          <Td data={e.name} subContent={<SubTd data={e.roles} inline />} />
          <TdIcons array={e.levels} />
          <TdIconsForTime array={e.availability} />
          <EditDeletePanel handlers={handlers} data={e} isConfirming={isConfirming} />
        </Tr>
      ))}
    </Table>
  );
};

export default ExaminersTable;
