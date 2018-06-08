export const formatLabel = (str) => {
  return str === undefined ? null : str.replace('_', ' ').toLowerCase();
}

export const generateClasses = (props, classes) => {
  const styles = [classes.Input];

  if(props.valid.length !== 0 && props.shouldValidate){
    styles.push(classes.Invalid);
  }

  if(props.hide && !props.showHidden){
    styles.push(classes.NotVisible);
  }

  if(props.group !== props.activeGroup){
    styles.push(classes.NotVisible);
  }

  return styles.join(" ");
}