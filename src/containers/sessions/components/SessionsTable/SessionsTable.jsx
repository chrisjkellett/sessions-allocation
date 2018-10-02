import React from 'react';
import { EditDeletePanel } from '../../../../components/Btns';
import { Table, Tr, Td, TdIcons, TdDate } from '../../../../components/Tables';
import IsNotEmpty from '../../../../components/Wrappers/IsNotEmpty/IsNotEmpty';
import Filter from '../../../../components/Filter/Filter';

const SessionsTable = ({ data, filtered, handlers, isConfirming }) => {
  const sessions = filtered === null ? data : filtered;
  const labels = ([
    null, 
    'time',
    <Filter label='venue' filter={handlers.filter} />,
    <Filter label='levels' filter={handlers.filter} />, 
    <Filter label='examiners' filter={handlers.filter} />, 
    <Filter label='support' filter={handlers.filter} />,
    null
  ]);

  return (
    <Table labels={labels}>
      <IsNotEmpty data={sessions}>
        {sessions.map(s => (
          <Tr key={s.id} sessions>
            <TdDate data={s['session_date']} />
            <Td data={s.time} />
            <Td data={s.venue} />
            <TdIcons array={s.levels} />
            <Td data={s.examiners} />
            <Td data={s.support} />
            <EditDeletePanel handlers={handlers} data={s} isConfirming={isConfirming} />
          </Tr>
        ))}
      </IsNotEmpty>
    </Table>
  );
};

export default SessionsTable;
