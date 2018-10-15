import React from 'react';
import { Table, Td, Tr, TdIcons, TdIconsForTime, SubTd } from '../../../../components';

const SingleItemForExaminer = ({ examiners }) => {
  const labels = [null, null, null];
  return !examiners 
    ? <div>no information available</div>
    : (
      <Table labels={labels}>
          {examiners.map(e => (
            <Tr 
              key={e.id} 
              name={e.name} >
              <Td data={e.name} subContent={<SubTd data={e.roles} />} />
              <TdIcons array={e.levels} />
              <TdIconsForTime array={e.availability} noBorders />
            </Tr>
          ))}
      </Table>
  )
}

export default SingleItemForExaminer;