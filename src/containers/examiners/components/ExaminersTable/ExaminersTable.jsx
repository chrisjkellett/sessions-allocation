import React from 'react';
import classes from '../../../css/tables.css';
import Table from '../../../../components/Tables/Table/Table';
import DeleteBtn from '../../../../components/Btns/DeleteBtn/DeleteBtn';
import EditBtn from '../../../../components/Btns/EditBtn/EditBtn';
import Td from '../../../../components/Tables/Td/Td/Td';
import TdIcons from '../../../../components/Tables/Td/TdIcons/TdIcons';
import TdIconsForTime from '../../../../components/Tables/Td/TdIcons/TdIconsForTime';
import SubTd from '../../../../components/Tables/Td/SubTd/SubTd';

const ExaminersTable = ({ data, handlers, isConfirming }) => {
  return (
    <div className={classes.Box}>
      <Table labels={['name', 'levels', 'availability', null, null]}>
        {data.map(e => (
          <tr className={classes.Row} key={e.name}>
            <Td string={e.name} subContent={<SubTd array={e.roles} />} />
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
