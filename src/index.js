const rotate = (index, max) => {
  if (index < 0) {
    return max + index;
  } else if (index >= max) {
    return index % (max);
  }
  return index;
};

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const createDigitRoutlette = () => {
  const update = () => {
  };

  return { update };
};

const digit = createDigitRoutlette();

const update = () => {
};

const loop = (func) => {
  const step = (timestamp) => {
    requestAnimationFrame(step);
    func(timestamp);
  };
  return { start: step };
};

loop(update).start();
