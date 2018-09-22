import moment from 'moment';

export const getLogData = (type, update) => {
  switch (type){
    case 'session':
      return{
        primary: moment(update.session_date.join("-")).format('dddd Do MMMM'),
        secondary: '(' + update.venue + ')'
      } 
    case 'venues':
      return{
        primary: update.name,
        secondary: 'to venues list'
      } 
    default:
      return {
        primary: update.name,
        secondary: null
      }
  }
}

export const formatError = (error) => {
  switch (error) {
    case 'EMAIL_EXISTS':
      return 'account already exists with this email'
    default:
      return error;
  }
}
