import classes from '../../../Sessions.css';

export const setClasses = (week, weekFilteredBy) => week === weekFilteredBy 
? [classes.SmallLink, classes.WeekSelected].join(" ")
: [classes.SmallLink]