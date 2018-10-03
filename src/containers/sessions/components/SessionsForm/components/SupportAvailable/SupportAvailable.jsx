import React from 'react';
import { Table, IsNotEmpty, Tr, Td, SubTd, TdIconsForTime, ShowHideBtn } from '../../../../../../components';

const SupportAvailable = ({ data, handlers, session, closeHandler }) => {
  const filteredData = data.filter(e => e.available);
  const labels = ['support', null, 'availability', <ShowHideBtn handler={closeHandler} type={'showSupport'} hide />]
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
      </IsNotEmpty>
    </Table>
  )
}

export default SupportAvailable;