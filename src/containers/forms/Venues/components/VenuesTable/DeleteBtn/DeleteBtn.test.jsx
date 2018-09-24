import React from 'react';
import DeleteBtn from './DeleteBtn';
import { shallow } from 'enzyme';
import classes from './DeleteBtn.css';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<DeleteBtn {...classes}/>);
})

test('renders correctly', () => {
  expect(wrapper.find('#delete-btn-panel')).toHaveLength(1);
})