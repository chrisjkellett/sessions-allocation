import React, { Component } from 'react';
import { Table, Tr, Td, TdIcons, TdDate, IsNotEmpty, Filter, EditDeletePanel } from '../../../../components';
import { Monthly, Weekly } from '../';

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
      <Filter label='levels' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
      <Filter label='examiners' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
      <Filter label='support' filter={handlers.filter} value={!activeFilter ? '' : undefined}/>,
      null
    ]);

    return (
      <Table labels={labels}>
        <IsNotEmpty data={sessions}>
          {sessions.map(s => (
            <Tr key={s.id}>
              <TdDate data={s['session_date']} subContent={[s.type, s.venue, s.time]} isSession handler={(id) => handlers.openSingleView(s.id)} />
              <TdIcons array={s.levels} />
              <Td data={s.examiners.map(e => e.name)} type={s.type} isYLE={s.levels.includes('YLE')}/>
              <Td data={s.support.map(s => s.name)} />
              <EditDeletePanel handlers={handlers} data={s} isConfirming={isConfirming} />
            </Tr>
          ))}
        </IsNotEmpty>
      </Table>
    );
  }
}

export default SessionsTable;
