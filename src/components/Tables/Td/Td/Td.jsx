import React from 'react';

const Td = ({ string, subContent }) => {
  return (
    <td>
      {string && string}
      {subContent && subContent}
    </td>
  )
}

export default Td;