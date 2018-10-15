import React from 'react';
import { SingleView, SingleItem, SingleItemForVenue, FlexContainer, FlexItem } from '../../../../../../components';

const labels = ['session date', 'time', 'type', 'venue', 'levels']

const SingleSession = ({ session, venues }) => {
  return (
    <SingleView>
      <FlexContainer>
        <FlexItem>
          <SingleItem label={labels[0]} data={session.session_date}/>
          <SingleItem label={labels[1]} data={session.time}/>
          <SingleItem label={labels[2]} data={session.type}/>
          <SingleItemForVenue label={labels[3]} venue={venues.find(v => v.name === session.venue)} />
          <SingleItem label={labels[4]} data={session.levels} icons/>
        </FlexItem>
        <FlexItem>
          examiners
        </FlexItem>
      </FlexContainer>
    </SingleView>
  )
}

export default SingleSession;