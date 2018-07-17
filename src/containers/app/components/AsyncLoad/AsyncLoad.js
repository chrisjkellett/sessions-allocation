
const AsyncLoad = (props, waitFor) => {
  return waitFor && props.children;
}

export default AsyncLoad
