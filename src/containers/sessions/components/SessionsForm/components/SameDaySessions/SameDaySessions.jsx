import React from 'react';
import { Table, Tr, Td, SubTd, TdIcons } from '../../../../../../components';

const SameDaySessions = ({ data }) => {
  const labels = [
    null,
    'examiners', 
    'support', 
    null
  ];

  return (
    <Table labels={labels} limited>
      {data.map(s => (
        <Tr key={s.id} >
          <TdIcons array={s.levels} subContent={<SubTd data={[s.type, s.venue, s.time]} inline/>} />
          <Td data={s.examiners} type={s.type}/>
          <Td data={s.support} />
          <td></td>
        </Tr>
      ))}
    </Table>
  )
}

export default SameDaySessions;