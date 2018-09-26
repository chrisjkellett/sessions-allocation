
const AsyncLoad = (props, waitFor) => {
  return waitFor === null ? 'Loading' : props.children;
}

export default AsyncLoad
