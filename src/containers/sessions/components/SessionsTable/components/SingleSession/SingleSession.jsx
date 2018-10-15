import React from 'react';
import { 
  SingleView, 
  SingleItem, 
  SingleItemForObject, 
  SingleItemForExaminer, 
  FlexContainer, 
  FlexItem,
  Label } from '../../../../../../components';

const labels = ['session date', 'time', 'type', 'venue', 'levels', 'examiners']

const SingleSession = ({ session, venues, examiners }) => {
  return (
    <SingleView>
      <FlexContainer>
        <FlexItem>
          <SingleItem label={labels[0]} data={session.session_date} isDate />
          <SingleItem label={labels[1]} data={session.time}/>
          <SingleItem label={labels[2]} data={session.type}/>
          <SingleItemForObject label={labels[3]} venue={venues.find(v => v.name === session.venue)} />
          <SingleItem label={labels[4]} data={session.levels} icons/>
        </FlexItem>
        <FlexItem double>
          <Label label={labels[5]}>
            <SingleItemForExaminer examiners={examiners.filter(e => session.examiners.includes(e.name))} />
          </Label>
        </FlexItem>
      </FlexContainer>
    </SingleView>
  )
}

export default SingleSession;