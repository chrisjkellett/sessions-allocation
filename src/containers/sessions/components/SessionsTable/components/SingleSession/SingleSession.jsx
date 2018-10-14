import React from 'react';
import { SingleView, FlexContainer, FlexItem } from '../../../../../../components';
import classes from './SingleSession.css';

const SingleSession = ({ session }) => {
  return (
    <SingleView>
      <FlexContainer>
        <FlexItem>
          <div className={classes.SingleItem}>
            <span>session date</span>
            <span>{session.session_date}</span>
          </div>
          <div>
            <span>start time</span>
            <span>{session.time}</span>
          </div>
        </FlexItem>
      </FlexContainer>
    </SingleView>
  )
}

export default SingleSession;