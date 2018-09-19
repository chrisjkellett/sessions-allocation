import sessions from './sessions.json';
import { 
  weeksFromObject, 
  monthsFromObject,
  setFromSessionPeriods, 
  setCurrentPeriodByWeek,
  calculateClosestWeek,
  filterSessionsByWeek,
} from './utility';
import { objectToArray } from '../utility';
import moment from 'moment';

let weeksBeginning, monthsBeginning, setOfWeeksBeginning;

beforeAll(() => {
  weeksBeginning = weeksFromObject(sessions);
  monthsBeginning = monthsFromObject(sessions);
  setOfWeeksBeginning = setFromSessionPeriods(weeksBeginning);
});

describe('to calculate periods by month', () => {
  test('sessions are mapped to months', () => {
    expect(monthsBeginning).toEqual(expect.arrayContaining(['July']));
  });
});

describe('to calculate periods by week', () => {
  test('sessions are mapped to 1st day of scheduled week', () => {
    expect(weeksBeginning).toEqual(expect.arrayContaining(['16th July']));
  });

  test('a set is created to elimate duplicates', () => {
    expect(setOfWeeksBeginning.find((item, index) => (setOfWeeksBeginning.indexOf(item) !== index))).toBeUndefined();
  });
});

describe('to set current period', () => {
  test('if no periods return null', () => {
    expect(setCurrentPeriodByWeek([])).toBeNull();
  });

  test('if one period return the period', () => {
    expect(setCurrentPeriodByWeek(['16th July'])).toBe('16th July');
  });

  test('if multiple periods including current return current', () => {
    if(moment().week() === 38)
      expect(calculateClosestWeek(['16th July', '23rd July', '17th September'])).toBe('17th September');
    else
      expect(calculateClosestWeek(['16th July', '23rd July', '17th September'])).toBe('17th September');
  })

  test('if multiple periods but not current return first', () => {
    expect(calculateClosestWeek(['16th July', '23rd July', '1st October'])).toBe('16th July');
  })
});

describe('to filter sessions by period', () => {
  test('find sessions which match by week starting', () => {
    expect(filterSessionsByWeek(objectToArray(sessions), '16th July')).toHaveLength(2)
  });
})

