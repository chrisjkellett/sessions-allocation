import React, { Component } from 'react';
import { Table, Tr, Td, TdIcons, TdDate, IsNotEmpty, Filter, EditDeletePanel, TdExaminer } from '../../../../components';
import { Monthly, Weekly } from '../';
import { isBeforeToday } from '../../../utility';

class SessionsTable extends Component {
  state = {
    showSingleView: false,
  }

  render(){
    const { data, filtered, handlers, isConfirming, activeFilter, showDateFilter } = this.props;
    const sessions = filtered === null ? data : filtered;
    const labels = ([
      showDateFilter ? null : <span>
        <Monthly />
        <Weekly />
      </span>, 
      data.length !== 0 && <Filter label='levels' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
      data.length !== 0 && <Filter label='examiners' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
      data.length !== 0 && <Filter label='support' filter={handlers.filter} value={!activeFilter ? '' : undefined}/>,
      null
    ]);
    let archived;

    return (
      <Table labels={labels}>
        <IsNotEmpty data={sessions}>
          {sessions.map(s => {
            archived = isBeforeToday(s['session_date']);
            return( 
              <Tr key={s.id} archived={archived}>
                <TdDate 
                  data={s['session_date']} 
                  subContent={[s.type, s.venue, s.time]} 
                  isSession 
                  handler={() => handlers.openSingleView(s.id)} 
                  archived= {archived}/>
                <TdIcons array={s.levels} />
                <TdExaminer data={s.examiners} type={s.type} isYLE={s.levels.includes('YLE')}/>
                <Td data={s.support.map(s => s.name)} />
                <EditDeletePanel handlers={handlers} data={s} isConfirming={isConfirming} />
              </Tr>
          )})}
        </IsNotEmpty>
      </Table>
    );
  }
}

export default SessionsTable;
