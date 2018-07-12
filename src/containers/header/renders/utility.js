import moment from 'moment';

export const getLogData = (type, update) => {
  switch (type){
    case 'session':
      return{
        primary: moment(update.session_date.join("-")).format('dddd Do MMMM'),
        secondary: '(' + update.venue + ')'
      } 
    case 'examiners':
      return {
        primary: update.name,
        secondary: null
      }
    default:
      return null;
  }
}