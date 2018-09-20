import * as checks from './checks';
import { Availability } from '../utility';

// const examinerOnLoad = {
//   "availability" : [ "Monday pm", "Tuesday", "Tuesday pm", "Wednesday", "Wednesday pm", "Thursday pm" ],
//   "levels" : [ "KET", "YLE", "PET" ],
//   "monitoring_level" : [ "KET" ],
//   "name" : "Christopher Kellett",
//   "roles" : [ "Speaking Examiner", "Team Leader" ]
// }

const Examiner = {avail: Availability(), available: true }

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
})
