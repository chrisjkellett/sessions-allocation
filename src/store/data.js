import moment from 'moment';

//non-imports
export const CURRENTYEAR = Number(moment().format('Y'));
export const CURRENTMONTH = Number(moment().format('M'));
export const CURRENTMONTH_AS_STRING = moment().format('MMMM');
export const CURRENTDAY = Number(moment().format('D'));
export const API_KEY = 'AIzaSyD7szxktlOq6NWXS-RMzkw-AJ_9KbfaZ6E';
export const SIGNUP_API = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;
export const AUTH_API = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;

//select options
export const locationOptions = ['Valencia', 'Murcia']
export const dayOptions = [
  {d: '1', id: '01'}, {d: '2', id: '02'}, {d: '3', id: '03'}, {d: '4', id: '04'},
  {d: '5', id: '05'}, {d: '6', id: '06'}, {d: '7', id: '07'}, {d: '8', id: '08'},
  {d: '9', id: '09'}, {d: '10', id: '10'}, {d: '11', id: '11'}, {d: '12', id: '12'},
  {d: '13', id: '13'}, {d: '14', id: '14'}, {d: '15', id: '15'}, {d: '16', id: '16'},
  {d: '17', id: '17'}, {d: '18', id: '18'}, {d: '19', id: '19'}, {d: '20', id: '20'},
  {d: '21', id: '21'}, {d: '22', id: '22'}, {d: '23', id: '23'}, {d: '24', id: '24'},
  {d: '25', id: '25'}, {d: '26', id: '26'}, {d: '27', id: '27'}, {d: '28', id: '28'},
  {d: '29', id: '29'}, {d: '30', id: '30'}, {d: '31', id: '31'}
];
export const monthOptions = [
  {m: 'January', id: '01'}, {m: 'February', id: '02'}, 
  {m: 'March', id: '03'}, {m: 'April', id: '04'}, 
  {m: 'May', id: '05'}, {m: 'June', id: '06'}, 
  {m: 'July', id: '07'}, {m: 'August', id: '08'}, 
  {m: 'September', id: '09'}, {m: 'October', id: '10'}, 
  {m: 'November', id: '11'}, {m: 'December', id: '12'}];
export const yearOptionsMonitoring = [CURRENTYEAR - 2, CURRENTYEAR - 1, CURRENTYEAR];
export const yearOptions = [CURRENTYEAR, CURRENTYEAR + 1];

//keys
export const levelKeys = ['YLE', 'KET', 'PET', 'FCE', 'CAE', 'CPE'];
export const roleKeys = ['Speaking Examiner', 'Supervisor', 'Invigilator', 'Support staff', 'Team Leader'];
export const availabilityKeys = ['Monday', 'Monday pm', 'Tuesday', 'Tuesday pm', 'Wednesday', 'Wednesday pm', 'Thursday', 'Thursday pm', 'Friday', 'Friday pm', 'Saturday', 'Saturday pm']
export const sessionTypeKeys = ['Speaking', 'Writing'];
export const venueKeys = ['Lenguas Vivas', 'Hotel Puerta', 'NH Centre'];
export const timeKeys = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '15:00', '15:30', '16:00'];