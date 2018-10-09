import React from 'react';
import { Table, IsNotEmpty, Tr, Td, SubTd, TdIcons, TdIconsForTime } from '../../../../../../components';

const ExaminersAvailable = ({ data, handlers, session, showUnavailable, showAssignSupervisors }) => {
  const filteredData = data.filter(e => e.available);
  const notAvailable = data.filter(e => !e.available);
  const labels = [
    <span>{'examiners (' + filteredData.length + ' available, ' + session.examiners.value.length + ' selected)'}</span>, 
    'levels', 
    'availability', 
    null
  ];
  const handler = showAssignSupervisors ? handlers.assignSupervisor : handlers.selectExaminer;

  return(
    <Table labels={labels} limited>
      <IsNotEmpty data={filteredData} show={showUnavailable}>
        {filteredData.map(e => (
          <Tr 
            key={e.id} 
            name={e.name} 
            handler={handler} 
            selected={session.examiners.value.includes(e.name)} >
            <Td data={e.name} subContent={<SubTd data={e.roles} />} />
            <TdIcons array={e.levels} />
            <TdIconsForTime array={e.availability} noBorders />
            <td></td>
          </Tr>
        ))}
      </IsNotEmpty>
      {showUnavailable && notAvailable.map(e => (
        <Tr 
          key={e.id} 
          name={e.name}
          disabled 
          handler={handlers.selectExaminer} 
          selected={session.examiners.value.includes(e.name)} >
          <Td data={e.name} subContent={<SubTd data={Object.keys(e.avail).filter(item => e.avail[item])} />} />
          <TdIcons array={e.levels} />
          <TdIconsForTime array={e.availability} noBorders />
          <td></td>
        </Tr>
      ))}
    </Table>
  )
}

export default ExaminersAvailable;