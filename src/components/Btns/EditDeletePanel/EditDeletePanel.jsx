import React from 'react';
import EditBtn from '../EditBtn/EditBtn';
import DeleteBtn from '../DeleteBtn/DeleteBtn';
import classes from './EditDeletePanel.css';

const EditDeletePanel = ({ handlers, data, isConfirming }) => {
  return (
    <td className={classes.Panel}>
      <EditBtn handlers={handlers} id={data.id} />
      <span> | </span>
      <DeleteBtn handlers={handlers} data={data} isConfirming={isConfirming} />
    </td>
  )
}

export default EditDeletePanel;