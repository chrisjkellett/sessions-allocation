import { filterOutOldSessions } from './utilities';

const beforeToday = {
  "-LHUEp8zg8IpE_X1nTcB" : {
    "session_date" : [ 2018, "07", "17" ],
  }
};

const afterToday = {
  "-LHUEp8zg8IpE_X1nTcB" : {
    "session_date" : [ 2018, "09", "19" ],
  }
};

const today = {
  "-LHUEp8zg8IpE_X1nTcB" : {
    "session_date" : [ 2018, "09", "18" ],
  }
};

test('filters sessions before today', () => {
  expect(filterOutOldSessions(beforeToday)).toHaveLength(0);
});

test('does not filter sessions after today', () => {
  expect(filterOutOldSessions(afterToday)).toHaveLength(1);
});

test('does not filter sessions today', () => {
  expect(filterOutOldSessions(today)).toHaveLength(1);
});