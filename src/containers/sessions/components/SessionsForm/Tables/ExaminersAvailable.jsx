import React from 'react';
import { Table, IsNotEmpty, Tr, Td, TdIcons, TdIconsForTime } from '../../../../../components';

const ExaminersAvailable = ({ data, handlers, session }) => {
  return(
    <Table labels={['name', 'roles', 'levels', 'availability', null]}>
      <IsNotEmpty data={data}>
        {data.filter(e => e.available).map(e => (
          <Tr 
            key={e.id} 
            name={e.name} 
            handler={handlers.selectExaminer} 
            selected={session.examiners.value.includes(e.name)} >
            <Td data={e.name} />
            <Td data={e.roles} smallFont />
            <TdIcons array={e.levels} />
            <TdIconsForTime array={e.availability} />
            <td></td>
          </Tr>
        ))}
      </IsNotEmpty>
    </Table>
  )
}

export default ExaminersAvailable;