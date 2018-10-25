import React from 'react';
import { 
  SingleView, 
  SingleItem, 
  SingleItemForObject, 
  SingleItemForExaminer, 
  FlexContainer, 
  FlexItem,
  Label } from '../../../../../../components';

const labels = ['session date', 'time', 'type', 'venue', 'levels', 'examiners', 'support']

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
            <SingleItemForExaminer examiners={session.examiners && examiners.filter(e => session.examiners.some(ex => ex.name === e.name))} />
          </Label>
          <Label label={labels[6]}>
            <SingleItemForExaminer examiners={session.support && examiners.filter(e => session.support.some(ex => ex.name === e.name))} />
          </Label>
        </FlexItem>
      </FlexContainer>
    </SingleView>
  )
}

export default SingleSession;