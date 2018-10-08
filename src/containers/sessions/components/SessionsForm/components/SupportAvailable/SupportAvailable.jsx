import React from 'react';
import { Table, IsNotEmpty, Tr, Td, SubTd, TdIconsForTime } from '../../../../../../components';

const SupportAvailable = ({ data, handlers, session, closeHandler, showUnavailable }) => {
  const filteredData = data.filter(e => e.available);
  const notAvailable = data.filter(e => !e.available);
  const labels = ['support', null, 'availability', null]
  return(
    <Table labels={labels} limited>
      <IsNotEmpty data={filteredData}>
        {filteredData.map(e => (
          <Tr 
            key={e.id} 
            name={e.name} 
            handler={handlers.selectSupport} 
            selected={session.support.value.includes(e.name)} >
            <Td data={e.name} subContent={<SubTd data={e.roles} />} />
            <td></td>
            <TdIconsForTime array={e.availability} noBorders/>
            <td></td>
          </Tr>
        ))}
        {showUnavailable && notAvailable.map(e => (
          <Tr 
            key={e.id} 
            name={e.name}
            disabled 
            handler={handlers.selectExaminer} 
            selected={session.support.value.includes(e.name)} >
            <Td data={e.name} subContent={<SubTd data={Object.keys(e.avail).filter(item => e.avail[item])} />} />
            <Td data={e.roles} smallFont></Td>
            <TdIconsForTime array={e.availability} noBorders />
            <td></td>
          </Tr>
        ))}
      </IsNotEmpty>
    </Table>
  )
}

export default SupportAvailable;