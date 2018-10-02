import React from 'react';
import moment from 'moment';

const TdDate = ({ data, subContent }) => {
  return (
    <td>
      {moment(data, 'YYYYMMDD').format('dddd Do MMMM')}
      {subContent && subContent}
    </td>
  )
};

export default TdDate;