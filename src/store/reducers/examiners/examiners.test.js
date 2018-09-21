import { filterExaminerByName } from './utility';

const examiners = [
  {name: 'Christopher Kellett'},
  {name: 'Sarah Baldock'},
  {name: 'Charles Kellett'},
]

test('returns 0 when string is <a>', () => {
  expect(filterExaminerByName(examiners, 'a')).toHaveLength(0);
});

test('returns 1 when string is <s>', () => {
  expect(filterExaminerByName(examiners, 's')).toHaveLength(1);
});

test('returns 2 when string is <ch>', () => {
  expect(filterExaminerByName(examiners, 'ch')).toHaveLength(2);
});

test('returns 0 when string is <cht>', () => {
  expect(filterExaminerByName(examiners, 'cht')).toHaveLength(0);
});

test('returns 1 when string is <cha>', () => {
  expect(filterExaminerByName(examiners, 'cha')).toHaveLength(1);
});