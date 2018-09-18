import moment from 'moment';

export const filterOutOldSessions = (sessions) => {
  const yesterday = moment().subtract(1, 'days');
  return Object.keys(sessions)
    .filter(item => moment(sessions[item]['session_date'].join("-")) >= yesterday)
    .map(item => sessions[item])
}
