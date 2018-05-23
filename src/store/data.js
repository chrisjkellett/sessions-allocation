import moment from 'moment';

//select options
export const locationOptions = ['Valencia', 'Murcia']
export const dayOptions = [...Array(32).keys()].splice(1);
export const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const yearOptions = [moment().format('Y'), Number(moment().format('Y')) + 1]