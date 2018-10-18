import React from 'react';
import { Table, IsNotEmpty, Tr, Td, SubTd, TdIconsForTime } from '../../../../../../components';

const SupportAvailable = ({ data, handlers, session, showUnavailable, selectedSupport }) => {
  const filteredData = data.filter(e => e.available);
  const notAvailable = data.filter(e => !e.available);
  const labels = [
    <span>{'support (' + filteredData.length + ' available, ' + selectedSupport.length + ' selected)'}</span>, 
    null, 
    'availability', 
    null
  ];
  const noRecordOrFilter = filteredData.length === 0 || showUnavailable;

  return(
    <Table labels={labels} limited smallHeaders>
      <IsNotEmpty data={filteredData} show={noRecordOrFilter}>
        {filteredData.map(e => (
          <Tr 
            key={e.id} 
            name={e.name} 
            handler={handlers.selectSupport} 
            selected={selectedSupport.find(ex => ex.name === e.name)} >
            <Td data={e.name} subContent={<SubTd data={e.roles} />} />
            <td></td>
            <TdIconsForTime array={e.availability} noBorders/>
            <td></td>
          </Tr>
        ))}
      </IsNotEmpty>
        {noRecordOrFilter && notAvailable.map(e => (
          <Tr 
            key={e.id} 
            name={e.name}
            disabled >
            <Td data={e.name} subContent={<SubTd data={Object.keys(e.avail).filter(item => e.avail[item])} />} />
            <td></td>
            <TdIconsForTime array={e.availability} noBorders />
            <td></td>
          </Tr>
        ))}
    </Table>
  )
}

export default SupportAvailable;