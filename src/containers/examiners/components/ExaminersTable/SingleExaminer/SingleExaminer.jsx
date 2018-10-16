import React from 'react';
import { 
  SingleView, 
  SingleItem, 
  SingleItemAvail, 
  FlexContainer, 
  FlexItem,
  Label,
  Table, 
  Tr, 
  TdDate, 
  TdIcons, 
  Td,
  Counter
} from '../../../../../components';

const labels = ['name', 'email', 'roles', 'id number', 'levels', 'availability', 'upcoming sessions']

const SingleExaminer = ({ examiner, sessions }) => {
  const filteredSessions = sessions
  .filter(sess => sess.examiners.includes(examiner.name) || sess.support.includes(examiner.name));

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
          {filteredSessions.length > 0 
            ? <Label label={labels[6]} counter={<Counter count={filteredSessions.length}/>}>
                <Table labels={[null, 'levels', 'examiners', 'support']} smallHeaders>
                  {filteredSessions
                    .map(s => (
                    <Tr key={s.id}>
                      <TdDate data={s['session_date']} subContent={[s.type, s.venue, s.time]} isSession />
                      <TdIcons array={s.levels} />
                      <Td data={s.examiners} type={s.type} isYLE={s.levels.includes('YLE')}/>
                      <Td data={s.support} />
                    </Tr>
                  ))}
                </Table>
              </Label>
            : <SingleItem label={labels[6]} data={'no available sessions'} />}
        </FlexItem>
      </FlexContainer>
    </SingleView>
  )
}

export default SingleExaminer;