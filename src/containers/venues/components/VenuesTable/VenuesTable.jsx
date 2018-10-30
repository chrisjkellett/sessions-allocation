import React, { Component } from 'react';
import { Table, Td, Tr, SubTd, EditDeletePanel, Filter, IsNotEmpty } from '../../../../components';

class VenuesTable extends Component {
  componentDidMount(){
    document.getElementById('name').focus();
  }

  render(){
    const { data, filtered, handlers, isConfirming, activeFilter } = this.props;
    const venues = filtered === null ? data : filtered;
    const labels = ([
      data.length !== 0 && <Filter label='name' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
      null,
      data.length !== 0 && 'contact', 
      data.length !== 0 && <Filter label='type' filter={handlers.filter} value={!activeFilter ? '' : undefined} />, 
      null
    ]);
  
    return (
      <Table labels={labels}>
        <IsNotEmpty data={venues}>
          {venues.map(v => (
            <Tr key={v.name}>
              <Td data={v.name} subContent={<SubTd data={v.address} inline />} />
              <td></td>
              <Td data={v.contact} />
              <Td data={v.type} type='array'/>
              <EditDeletePanel handlers={handlers} data={v} isConfirming={isConfirming} />
            </Tr>
          ))}
        </IsNotEmpty>
      </Table>
    );
  }
}

export default VenuesTable;
