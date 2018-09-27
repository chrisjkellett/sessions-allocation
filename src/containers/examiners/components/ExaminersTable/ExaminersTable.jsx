import React from 'react';
import classes from '../../../css/tables.css';
import DeleteBtn from '../../../../components/Btns/DeleteBtn/DeleteBtn';
import EditBtn from '../../../../components/Btns/EditBtn/EditBtn';
import { Table, Td, TdIcons, TdIconsForTime, SubTd } from '../../../../components/Tables';

const ExaminersTable = ({ data, handlers, isConfirming }) => {
  return (
    <div className={classes.Box}>
      <Table labels={['name', 'levels', 'availability', null, null]}>
        {data.map(e => (
          <tr className={classes.Row} key={e.name}>
            <Td data={e.name} subContent={<SubTd data={e.roles} />} />
            <TdIcons array={e.levels} />
            <TdIconsForTime array={e.availability} />
            <td></td>
            <td>
              <EditBtn handler={handlers.edit} id={e.id} />
              <span> | </span>
              <DeleteBtn handlers={handlers} data={e} isConfirming={isConfirming} />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default ExaminersTable;
