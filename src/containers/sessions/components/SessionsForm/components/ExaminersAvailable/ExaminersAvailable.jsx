import React from 'react';
import { Table, IsNotEmpty, Tr, Td, TdIcons, TdIconsForTime, ShowHideBtn } from '../../../../../../components';

const ExaminersAvailable = ({ data, handlers, session, closeHandler }) => {
  const filteredData = data.filter(e => e.available);
  return(
    <Table labels={['name', 'roles', 'levels', 'availability', <ShowHideBtn handler={closeHandler} type={'showExaminers'} hide />]}>
      <IsNotEmpty data={filteredData}>
        {filteredData.map(e => (
          <Tr 
            key={e.id} 
            name={e.name} 
            handler={handlers.selectExaminer} 
            selected={session.examiners.value.includes(e.name)} >
            <Td data={e.name} />
            <Td data={e.roles} smallFont />
            <TdIcons array={e.levels} />
            <TdIconsForTime array={e.availability} noBorders />
            <td></td>
          </Tr>
        ))}
      </IsNotEmpty>
    </Table>
  )
}

export default ExaminersAvailable;