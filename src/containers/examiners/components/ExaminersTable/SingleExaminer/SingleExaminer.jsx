import React from 'react';
import { 
  SingleView, 
  SingleItem,  
  FlexContainer, 
  FlexItem } from '../../../../../components';

const labels = ['name']

const SingleExaminer = ({ examiner, venues, sessions }) => {
  return (
    <SingleView>
      <FlexContainer>
        <FlexItem>
          <SingleItem label={labels[0]} data={examiner.name} />

        </FlexItem>
        <FlexItem double>
          
        </FlexItem>
      </FlexContainer>
    </SingleView>
  )
}

export default SingleExaminer;