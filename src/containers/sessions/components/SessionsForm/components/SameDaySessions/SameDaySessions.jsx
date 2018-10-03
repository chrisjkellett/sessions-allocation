import React from 'react';
import { Table, IsNotEmpty, Tr, Td, SubTd, TdIcons, ShowHideBtn } from '../../../../../../components';
import moment from 'moment';

const SameDaySessions = ({ data, session, closeHandler }) => {
  const sessionDate = session['session_date'].value;
  const filtered = data.filter(s => moment(s['session_date']).isSame(sessionDate));
  const labels = [
    null,
    'examiners', 
    'support', 
    <ShowHideBtn handler={closeHandler} type={'showSameDay'} hide />
  ];

  return(
    <Table labels={labels} limited>
      <IsNotEmpty data={filtered}>
        {filtered.map(s => (
          <Tr key={s.id} >
            <TdIcons array={s.levels} subContent={<SubTd data={[s.type, s.venue, s.time]} inline/>} />
            <Td data={s.examiners} />
            <Td data={s.support} />
            <td></td>
          </Tr>
        ))}
      </IsNotEmpty>
    </Table>
  )
}

export default SameDaySessions;