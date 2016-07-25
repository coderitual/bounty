export default (index, max) => {
  if (index < 0) {
    return max + index;
  } else if (index >= max) {
    return index % (max);
  }
  return index;
};
