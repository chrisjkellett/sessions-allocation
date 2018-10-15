import React from 'react';

const SingleItem = ({ label, children }) => {
  return (
    <div>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  )
}

export default SingleItem;