import moment from 'moment';

//non-imports
const CURRENTYEAR = Number(moment().format('Y'));

//select options
export const locationOptions = ['Valencia', 'Murcia']
export const dayOptions = [...Array(32).keys()].splice(1);
export const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const yearOptionsMonitoring = [CURRENTYEAR - 2, CURRENTYEAR - 1, CURRENTYEAR]

//keys
export const levelKeys = ['YLE', 'KET', 'PET', 'FCE', 'CAE', 'CPE'];
export const roleKeys = ['Speaking Examiner', 'Supervisor', 'Invigilator', 'Support staff'];
export const availabilityKeys = ['Monday', 'Monday pm', 'Tuesday', 'Tuesday pm', 'Wednesday', 'Wednesday pm', 'Thursday', 'Thursday pm', 'Friday', 'Friday pm', 'Saturday', 'Saturday pm']
