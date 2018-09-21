import * as checks from './checks';
import { Availability } from '../utility';

const Examiner = {avail: Availability(), available: true }

describe('tests on SE roles[type]', () => {
  const SE = {
    ...Examiner, roles : [ "Speaking Examiner", "Team Leader" ], name: 'Christopher Kellett'
  }

  const sup = {
    ...Examiner, roles : [ "Supervisor", "Team Leader" ], name: 'Christopher Kellett'
  }

  test('supervisor will pass if type is Writing', () => {
    const filtered = checks.type(sup, 'Writing');
    expect(filtered.avail.failsRoles).toBe(false);
  });

  test('supervisor will fail if type is Speaking', () => {
    const filtered = checks.type(sup, 'Speaking');
    expect(filtered.avail.failsRoles).toBe(true);
  });

  test('SE will fail if type is Writing', () => {
    const filtered = checks.type(SE, 'Writing');
    expect(filtered.avail.failsRoles).toBe(true);
  });

  test('SE will pass if type is Speaking', () => {
    const filtered = checks.type(SE, 'Speaking');
    expect(filtered.avail.failsRoles).toBe(false);
  });
}); 

describe('tests on level filter', () => {
  const examiner = {
    ...Examiner, levels: [ "KET", "YLE", "PET" ] 
  };

  test('will pass when session is KET', () => {
    const filtered = checks.levels(examiner, ["KET"]);
    expect(filtered.avail.failsLevel).toBe(false);
  });

  test('will pass when session is KET and PET', () => {
    const filtered = checks.levels(examiner, ["KET", "PET"]);
    expect(filtered.avail.failsLevel).toBe(false);
  });

  test('will fail when session is CAE', () => {
    const filtered = checks.levels(examiner, ["CAE"]);
    expect(filtered.avail.failsLevel).toBe(true);
  });

  test('will fail when session is KET and CAE', () => {
    const filtered = checks.levels(examiner, ["KET", "CAE"]);
    expect(filtered.avail.failsLevel).toBe(true);
  });
});

describe('tests on availability filter', () => {
  const examiner = {
    ...Examiner, "availability" : [ "Monday pm", "Tuesday", "Tuesday pm", "Wednesday", "Wednesday pm", "Thursday pm" ]
  };

  test('will fail when session is outside their availability', () => {
    //20-09 is a Thursday at 8am - examiner is not available Thursday am
    const filtered = checks.day(examiner, [2018, "09", "20"], '08:00');
    expect(filtered.avail.failsAvailability).toBe(true);
  });

  test('will pass when session fits availability ', () => {
    //20-09 is a Thursday at 15:00pm - examiner is available Thursday pm
    const filtered = checks.day(examiner, [2018, "09", "20"], '15:00');
    expect(filtered.avail.failsAvailability).toBe(false);
  });
});

describe('tests on isSupportAlso', () => {
  const examiner = {
    ...Examiner, 
    "availability" : [ "Monday pm", "Tuesday", "Tuesday pm", "Wednesday", "Wednesday pm", "Thursday pm" ],
    name: 'Christopher Kellett',
  };

  test('will fail when already selected as support', () => {
    const filtered = checks.isSupportAlso(examiner, ['Christopher Kellett']);
    expect(filtered.avail.failsIsSupport).toBe(true);
  });

  test('will pass when not selected as support', () => {
    const filtered = checks.isSupportAlso(examiner, ['Another examiner']);
    expect(filtered.avail.failsIsSupport).toBe(false);
  });
});

describe('tests on isExaminerAlso', () => {
  const examiner = {
    ...Examiner, 
    "availability" : [ "Monday pm", "Tuesday", "Tuesday pm", "Wednesday", "Wednesday pm", "Thursday pm" ],
    name: 'Christopher Kellett',
  };

  test('will fail when already selected as support', () => {
    const filtered = checks.isExaminerAlso(examiner, ['Christopher Kellett']);
    expect(filtered.avail.failsIsExaminer).toBe(true);
  });

  test('will pass when not selected as support', () => {
    const filtered = checks.isExaminerAlso(examiner, ['Another examiner']);
    expect(filtered.avail.failsIsExaminer).toBe(false);
  });
});




