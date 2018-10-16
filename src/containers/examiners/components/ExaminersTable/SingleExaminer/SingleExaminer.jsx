import React from 'react';
import { 
  SingleView, 
  SingleItem, 
  SingleItemAvail, 
  FlexContainer, 
  FlexItem } from '../../../../../components';

const labels = ['name', 'email', 'roles', 'id number', 'levels', 'availability']

const SingleExaminer = ({ examiner, venues, sessions }) => {
  return (
    <SingleView>
      <FlexContainer>
        <FlexItem>
          <SingleItem label={labels[0]} data={examiner.name} />
          <SingleItem label={labels[1]} data={examiner.email} />
          <SingleItem label={labels[2]} data={examiner.roles} array />
          {examiner['id_number'] && <SingleItem label={labels[3]} data={examiner['id_number']} />}
          {examiner['levels'] && <SingleItem label={labels[4]} data={examiner['levels']} icons />}
          <SingleItemAvail label={labels[5]} data={examiner.availability} />
        </FlexItem>
        <FlexItem double>
          
        </FlexItem>
      </FlexContainer>
    </SingleView>
  )
}

export default SingleExaminer;