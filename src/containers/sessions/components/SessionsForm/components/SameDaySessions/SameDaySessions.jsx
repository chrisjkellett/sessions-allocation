import React from 'react';
import { Table, Tr, Td, SubTd } from '../../../../../../components';

const SameDaySessions = ({ data }) => {
  const labels = [
    null,
    'examiners', 
    'support', 
    null
  ];

  return (
    <Table labels={labels} limited smallHeaders>
      {data.map(s => (
        <Tr key={s.id} >
          <Td data={null} subContent={<SubTd data={[s.levels, s.type + ' @', s.venue, s.time]} inline/>} />
          <Td data={s.examiners.map(e => e.name)} type={s.type}/>
          <Td data={s.support.map(e => e.name)} />
          <td></td>
        </Tr>
      ))}
    </Table>
  )
}

export default SameDaySessions;