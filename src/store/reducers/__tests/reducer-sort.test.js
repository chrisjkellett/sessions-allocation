import { sortBy } from '../utility';

const data = [
  {name: "Sarah Baldock"},
  {name: "Christopher Kellett"},
  {name: "Yessica Cobo"},
  {name: "Jack Reilly"}
]

test('sorts an array of objects by name', () => {
  const result = sortBy(data, 'name');
  expect(result[0].name).toBe("Christopher Kellett");
})