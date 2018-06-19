import moment from 'moment';

//non-imports
const CURRENTYEAR = Number(moment().format('Y'));

//select options
export const locationOptions = ['Valencia', 'Murcia']
export const dayOptions = [...Array(32).keys()].splice(1);
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