import React from 'react';
import classes from '../../../css/tables.css';
import Table from '../../../../components/FormElements/Table/Table';
import DeleteBtn from '../../../../components/Btns/DeleteBtn/DeleteBtn';
import EditBtn from '../../../../components/Btns/EditBtn/EditBtn';

const ExaminersTable = ({ data, handlers, isConfirming }) => {
  return (
    <div className={classes.Box}>
      <Table labels={['name', null, null, null, null]}>
        {data.map(e => (
          <tr className={classes.Row} key={e.name}>
            <td>{e.name}</td>
            <td></td>
            <td></td>
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
