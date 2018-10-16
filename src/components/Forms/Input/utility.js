import classes from './Input.css';

export const formatLabel = (str) => {
  return str === undefined ? null : str.replace(/_/g, ' ').toLowerCase();
}

export const generateClasses = (props, classes) => {
  const styles = [classes.Input];

  if(props.valid.length !== 0 && props.shouldValidate && !props.elementConfig.disabled){
    styles.push(classes.Invalid);
  }

  if(props.hide && !props.showHidden){
    styles.push(classes.NotVisible);
  }

  if(props.inline){
    styles.push(classes.InlineSelect)
  }

  return styles.join(" ");
}

 export const generateLabelClass = (props) => {
  const config = {...props.elementConfig};
  if(config.disabled)
    return classes.disabledCheckbox;
  else
    return classes.Checkbox;
}