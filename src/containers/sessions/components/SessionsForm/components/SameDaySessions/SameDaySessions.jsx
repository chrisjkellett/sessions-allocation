import React from 'react';
import { Table, Tr, Td, SubTd, TdIcons, ShowHideBtn } from '../../../../../../components';

const SameDaySessions = ({ data, closeHandler }) => {
  const labels = [
    null,
    'examiners', 
    'support', 
    <ShowHideBtn handler={closeHandler} type={'showSameDay'} hide />
  ];

  return(
    <Table labels={labels} limited>
      {data.map(s => (
        <Tr key={s.id} >
          <TdIcons array={s.levels} subContent={<SubTd data={[s.type, s.venue, s.time]} inline/>} />
          <Td data={s.examiners} />
          <Td data={s.support} />
          <td></td>
        </Tr>
      ))}
    </Table>
  )
}

export default SameDaySessions;