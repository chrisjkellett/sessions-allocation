import React from 'react';
import { EditDeletePanel } from '../../../../components/Btns';
import { Table, Tr, Td, SubTd, TdIcons, TdIconsForTime } from '../../../../components/Tables';
import IsNotEmpty from '../../../../components/Wrappers/IsNotEmpty/IsNotEmpty';
import Filter from '../../../../components/Filter/Filter';

const ExaminersTable = ({ data, filtered, handlers, isConfirming, activeFilter }) => {
  const examiners = filtered === null ? data : filtered;
  const labels = ([
    <Filter label='name' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
    <Filter label='roles' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
    <Filter label='levels' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
    <Filter label='availability' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
    null
  ]);

  return (
    <Table labels={labels}>
      <IsNotEmpty data={examiners}>
        {examiners.map(e => (
          <Tr key={e.name}>
            <Td data={e.name} subContent={<SubTd data={e.roles} />} />
            <td></td>
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
