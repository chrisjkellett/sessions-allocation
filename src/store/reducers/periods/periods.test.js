import reducer, {initialState} from './periods';
import sessions from './sessions.json';
import { weeksFromObject, setFromSessionPeriods } from './utility';

describe('when LOAD_PERIODS to calculate periods', () => {
  let weeksBeginning, setOfWeeksBeginning;

  beforeAll(() => {
    weeksBeginning = weeksFromObject(sessions);
    setOfWeeksBeginning = setFromSessionPeriods(weeksBeginning)
  });

  test('sessions are mapped to 1st day of scheduled week', () => {
    expect(weeksBeginning).toEqual(expect.arrayContaining(['16th July']));
  });

  test('a set is created to elimate duplicates', () => {
    expect(setOfWeeksBeginning.find((item, index) => (setOfWeeksBeginning.indexOf(item) !== index))).toBeUndefined();
  });

})
