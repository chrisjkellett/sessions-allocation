import classes from '../Weekly.css';

export const setClasses = (week, weekFilteredBy) => week === weekFilteredBy 
? [classes.SmallLink, classes.WeekSelected].join(" ")
: [classes.SmallLink]