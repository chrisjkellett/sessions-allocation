import moment from 'moment';

export const getLogData = ({type}, update) => {
  switch (type){
    case 'session':
      return{
        primary: moment(update.session_date.join("-")).format('dddd Do MMMM'),
        secondary: '(' + update.venue + ')'
      } 
    case 'venues':
      return{
        primary: update.name,
        secondary: null
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
    case 'SERVER_ERROR':
      return 'connection to internet has been lost'
    default:
      return error;
  }
}
