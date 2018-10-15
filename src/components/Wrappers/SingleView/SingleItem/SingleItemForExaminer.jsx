import React from 'react';
import { Table, IsNotEmpty, Td, Tr, TdIcons, TdIconsForTime, SubTd } from '../../../../components';

const SingleItemForExaminer = ({ examiners }) => {
  const labels = [null, null, null];
  return (
    <Table labels={labels}>
      <IsNotEmpty data={examiners} >
        {examiners.map(e => (
          <Tr 
            key={e.id} 
            name={e.name} >
            <Td data={e.name} subContent={<SubTd data={e.roles} />} />
            <TdIcons array={e.levels} />
            <TdIconsForTime array={e.availability} noBorders />
          </Tr>
        ))}
      </IsNotEmpty>
    </Table>
  )
}

export default SingleItemForExaminer;