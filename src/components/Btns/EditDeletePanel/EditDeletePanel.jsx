import React from 'react';
import EditBtn from '../EditBtn/EditBtn';
import DeleteBtn from '../DeleteBtn/DeleteBtn';

const EditDeletePanel = ({ handlers, data, isConfirming }) => {
  return (
    <td>
      <EditBtn handlers={handlers} id={data.id} />
      <span> | </span>
      <DeleteBtn handlers={handlers} data={data} isConfirming={isConfirming} />
    </td>
  )
}

export default EditDeletePanel;