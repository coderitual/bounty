export default func => {
  let frame;
  const step = timestamp => {
    frame = requestAnimationFrame(step);
    func(timestamp);
  };
  step(0);
  return () => cancelAnimationFrame(frame);
};
