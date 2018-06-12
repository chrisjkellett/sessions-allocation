const guard = (props) => {
  if (props.user && props.user !== 'not found'){
    return props.children;
  }
  else 
    return null;
}

export default guard;