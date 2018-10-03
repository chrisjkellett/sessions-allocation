import React from 'react';
import { Table, IsNotEmpty, Tr, Td, TdIconsForTime, ShowHideBtn } from '../../../../../../components';

const SupportAvailable = ({ data, handlers, session, closeHandler }) => {
  return(
    <Table labels={['name', 'roles', null, 'availability', <ShowHideBtn handler={closeHandler} type={'showSupport'} hide />]}>
      <IsNotEmpty data={data}>
        {data.filter(e => e.available).map(e => (
          <Tr 
            key={e.id} 
            name={e.name} 
            handler={handlers.selectSupport} 
            selected={session.support.value.includes(e.name)} >
            <Td data={e.name} />
            <Td data={e.roles} smallFont />
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