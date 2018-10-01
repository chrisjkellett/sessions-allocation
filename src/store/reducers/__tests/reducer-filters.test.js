import { filterData } from '../utility';

const examiners = [
  {name: 'Christopher Kellett', levels: ['KET']},
  {name: 'Sarah Baldock', levels: ['KET', 'PET']},
  {name: 'Charles Kellett', levels: ['PET', 'FCE']},
];


describe('when filtered by level', () => {
  const action = {
    value: '',
    filterBy: 'levels',
  };
  
  test('returns null when string is empty', () => {
    expect(filterData(examiners, action)).toBeNull();
  });

  test('returns 2 when string is <k>', () => {
    action.value = 'k';
    expect(filterData(examiners, action)).toHaveLength(2);
  });

  test('returns 2 when string is <ket>', () => {
    action.value = 'ket';
    expect(filterData(examiners, action)).toHaveLength(2);
  });

  test('returns 0 when string is <kett>', () => {
    action.value = 'kett';
    expect(filterData(examiners, action)).toHaveLength(0);
  });

  test('returns 1 when string is <f>', () => {
    action.value = 'f';
    expect(filterData(examiners, action)).toHaveLength(1);
  });

})


describe('when filtered by name', () => {
  const action = {
    value: '',
    filterBy: 'name',
  };

  test('returns null when string is empty', () => {
    expect(filterData(examiners, action)).toBeNull();
  });
  
  test('returns 0 when string is <a>', () => {
    action.value = 'a';
    expect(filterData(examiners, action)).toHaveLength(0);
  });
  
  test('returns 1 when string is <s>', () => {
    action.value = 's';
    expect(filterData(examiners, action)).toHaveLength(1);
  });
  
  test('returns 2 when string is <ch>', () => {
    action.value = 'ch';
    expect(filterData(examiners, action)).toHaveLength(2);
  });
  
  test('returns 0 when string is <cht>', () => {
    action.value = 'cht';
    expect(filterData(examiners, action)).toHaveLength(0);
  });
  
  test('returns 1 when string is <cha>', () => {
    action.value = 'cha';
    expect(filterData(examiners, action)).toHaveLength(1);
  });
})
