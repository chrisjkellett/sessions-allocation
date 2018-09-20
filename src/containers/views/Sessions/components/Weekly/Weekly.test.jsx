import React from 'react';
import { shallow } from 'enzyme';
import { UnconnectedWeekly } from './Weekly';
import FilterPanel from './components/FilterPanel';

let wrapper;
const props = {
  weeks: []
};

beforeEach(() => {
  wrapper = shallow(<UnconnectedWeekly {...props} />)
});

describe('when no weeks', () => {
  test('show nothing', () => {
    expect(wrapper.find('span')).toHaveLength(0);
  });
  
  test('show nothing even if showOptions set to true', () => {
    wrapper.setState({ showOptions: true });
    expect(wrapper.find('span')).toHaveLength(0);;
  });
})

describe('when one week', () => {
  test('show nothing', () => {
    wrapper.setProps({ weeks: ['one_item'] });
    expect(wrapper.find('span')).toHaveLength(0);
  });
  
  test('show nothing even if showOptions set to true', () => {
    wrapper.setProps({ weeks: ['one_item'] });
    wrapper.setState({ showOptions: true });
    expect(wrapper.find('span')).toHaveLength(0);;
  });
});

describe('when multiple weeks', () => {
  test('show the split btn', () => {
    wrapper.setProps({ weeks: ['one_item', 'second_item'] });
    expect(wrapper.find('#split-btn')).toHaveLength(1);
  });
  
  test('show week filters if showOptions set to true', () => {
    wrapper.setProps({ weeks: ['one_item', 'second_item'] });
    wrapper.setState({ showOptions: true });
    expect(wrapper.find(FilterPanel)).toHaveLength(1);
  });
});


