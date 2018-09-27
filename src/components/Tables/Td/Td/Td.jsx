import React from 'react';

const Td = ({ data, subContent }) => {
  return (
    <td>
      {typeof data === 'object' 
        ? data.join(" | ")
        : data ? data : '-'
      }
      {subContent && subContent}
    </td>
  )
}

export default Td;