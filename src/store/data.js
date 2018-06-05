import moment from 'moment';

//non-imports
const CURRENTYEAR = Number(moment().format('Y'));

//select options
export const locationOptions = ['Valencia', 'Murcia']
export const dayOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
export const monthOptions = [
  {m: 'January', id: '01'}, {m: 'February', id: '02'}, {m: 'March', id: '03'}, {m: 'April', id: '04'}, {m: 'May', id: '05'}, {m: 'June', id: '06'}, {m: 'July', id: '07'}, {m: 'August', id: '08'}, {m: 'September', id: '09'}, {m: 'October', id: '10'}, {m: 'November', id: '11'}, {m: 'December', id: '12'}];
export const yearOptionsMonitoring = [CURRENTYEAR - 2, CURRENTYEAR - 1, CURRENTYEAR]

//keys
export const levelKeys = ['YLE', 'KET', 'PET', 'FCE', 'CAE', 'CPE'];
export const roleKeys = ['Speaking Examiner', 'Supervisor', 'Invigilator', 'Support staff'];
export const availabilityKeys = ['Monday', 'Monday pm', 'Tuesday', 'Tuesday pm', 'Wednesday', 'Wednesday pm', 'Thursday', 'Thursday pm', 'Friday', 'Friday pm', 'Saturday', 'Saturday pm']
