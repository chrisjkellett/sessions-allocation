import React, {Component} from 'react';
import { Table, Tr, Td, SubTd, TdIcons, TdIconsForTime, EditDeletePanel } from '../../../../components';
import IsNotEmpty from '../../../../components/Wrappers/IsNotEmpty/IsNotEmpty';
import Filter from '../../../../components/Filter/Filter';

class ExaminersTable extends Component {
  componentDidMount(){
    document.getElementById('name').focus();
  }

  render(){
    const { data, filtered, handlers, isConfirming, activeFilter } = this.props;
    const examiners = filtered === null ? data : filtered;
    const labels = ([
      <Filter label='name' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
      null, 
      <Filter label='levels' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
      <Filter label='availability' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
      null
    ]);
  
    return (
      <Table labels={labels}>
        <IsNotEmpty data={examiners}>
          {examiners.map(e => (
            <Tr key={e.name}>
              <Td data={e.name} subContent={<SubTd data={e.roles} />} handler={() => handlers.openSingleView(e.id)}  />
              <td></td>
              <TdIcons array={e.levels} />
              <TdIconsForTime array={e.availability} />
              <EditDeletePanel handlers={handlers} data={e} isConfirming={isConfirming} />
            </Tr>
          ))}
        </IsNotEmpty>
      </Table>
    );
  }
}

export default ExaminersTable;
