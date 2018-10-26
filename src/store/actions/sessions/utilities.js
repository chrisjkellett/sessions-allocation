import moment from 'moment';

export const filterSessionsByToday = (sessions) => {
  const yesterday = moment().subtract(1, 'days');
  const current = Object.keys(sessions)
    .filter(item => moment(sessions[item]['session_date'].join("-")) >= yesterday)
    .map(a => ({...sessions[a], id: a}));
  const archive = Object.keys(sessions)
    .filter(item => moment(sessions[item]['session_date'].join("-")) <= yesterday)
    .map(a => ({...sessions[a], id: a}));
  return {current: current, archive: archive}
}
