import React from 'react';
import { EditDeletePanel } from '../../../../components/Btns';
import { Table, Tr, Td, TdIcons, TdIconsForTime } from '../../../../components/Tables';
import IsNotEmpty from '../../../../components/Wrappers/IsNotEmpty/IsNotEmpty';
import Filter from '../../../../components/Filter/Filter';

const ExaminersTable = ({ data, filtered, handlers, isConfirming }) => {
  const examiners = filtered === null ? data : filtered;
  const labels = ([
    <Filter label='name' filter={handlers.filter} />, 
    <Filter label='roles' filter={handlers.filter} />,
    <Filter label='levels' filter={handlers.filter} />, 
    <Filter label='availability' filter={handlers.filter} />, 
    null
  ]);

  return (
    <Table labels={labels}>
      <IsNotEmpty data={examiners}>
        {examiners.map(e => (
          <Tr key={e.name}>
            <Td data={e.name}/>
            <Td data={e.roles} smallFont type='array'/>
            <TdIcons array={e.levels} />
            <TdIconsForTime array={e.availability} />
            <EditDeletePanel handlers={handlers} data={e} isConfirming={isConfirming} />
          </Tr>
        ))}
      </IsNotEmpty>
    </Table>
  );
};

export default ExaminersTable;
