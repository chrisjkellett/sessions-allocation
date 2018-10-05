import React from 'react';
import { Table, IsNotEmpty, Tr, Td, SubTd, TdIcons, TdIconsForTime, ShowHideBtn } from '../../../../../../components';

const ExaminersAvailable = ({ data, handlers, session, closeHandler, showUnavailable }) => {
  const filteredData = data.filter(e => e.available);
  const notAvailable = data.filter(e => !e.available);
  const labels = [
    <span>{'examiners (' + filteredData.length + ' available, ' + session.examiners.value.length + ' selected)'}</span>, 
    'levels', 
    'availability', 
    <ShowHideBtn handler={closeHandler} type={'showExaminers'} hide />
  ];

  return(
    <Table labels={labels} limited>
      <IsNotEmpty data={filteredData}>
        {filteredData.map(e => (
          <Tr 
            key={e.id} 
            name={e.name} 
            handler={handlers.selectExaminer} 
            selected={session.examiners.value.includes(e.name)} >
            <Td data={e.name} subContent={<SubTd data={e.roles} />} />
            <TdIcons array={e.levels} />
            <TdIconsForTime array={e.availability} noBorders />
            <td></td>
          </Tr>
        ))}
        {showUnavailable && notAvailable.map(e => (
          <Tr 
            key={e.id} 
            name={e.name}
            disabled 
            handler={handlers.selectExaminer} 
            selected={session.examiners.value.includes(e.name)} >
            <Td data={e.name} subContent={<SubTd data={Object.keys(e.avail).filter(item => e.avail[item])} />} />
            <Td data={e.roles} smallFont></Td>
            <TdIcons array={e.levels} />
            <TdIconsForTime array={e.availability} noBorders />
          </Tr>
        ))}
      </IsNotEmpty>
    </Table>
  )
}

export default ExaminersAvailable;