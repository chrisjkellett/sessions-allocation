import React from 'react';
import { SingleView } from '../../../../../../components';


const SingleSession = ({ session }) => {
  return (
    <SingleView>
      <div>{session.id}</div>
    </SingleView>
  )
}

export default SingleSession;