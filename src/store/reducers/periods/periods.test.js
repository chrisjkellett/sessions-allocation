import sessions from './sessions.json';
import { 
  weeksFromObject, 
  setFromSessionPeriods, 
  setCurrentPeriod,
  calculateClosest,
  filterSessionsByWeek,
} from './utility';
import { objectToArray } from '../utility';
import moment from 'moment';

let weeksBeginning, setOfWeeksBeginning;

beforeAll(() => {
  weeksBeginning = weeksFromObject(sessions);
  setOfWeeksBeginning = setFromSessionPeriods(weeksBeginning);
});

describe('to calculate periods', () => {
  test('sessions are mapped to 1st day of scheduled week', () => {
    expect(weeksBeginning).toEqual(expect.arrayContaining(['16th July']));
  });

  test('a set is created to elimate duplicates', () => {
    expect(setOfWeeksBeginning.find((item, index) => (setOfWeeksBeginning.indexOf(item) !== index))).toBeUndefined();
  });
});

describe('to set current period', () => {
  test('if no periods return null', () => {
    expect(setCurrentPeriod([])).toBeNull();
  });

  test('if one period return the period', () => {
    expect(setCurrentPeriod(['16th July'])).toBe('16th July');
  });

  test('if multiple periods including current return current', () => {
    if(moment().week() === 38)
      expect(calculateClosest(['16th July', '23rd July', '17th September'])).toBe('17th September');
    else
      expect(calculateClosest(['16th July', '23rd July', '17th September'])).toBe('17th September');
  })

  test('if multiple periods but not current return first', () => {
    expect(calculateClosest(['16th July', '23rd July', '1st October'])).toBe('16th July');
  })
});

describe('to filter sessions by period', () => {
  test('find sessions which match by week starting', () => {
    expect(filterSessionsByWeek(objectToArray(sessions), '16th July')).toHaveLength(2)
  });
})

