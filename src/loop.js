export default (func) => {
  const step = (timestamp) => {
    requestAnimationFrame(step);
    func(timestamp);
  };
  return { start: () => step(0) };
};
