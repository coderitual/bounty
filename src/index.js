const SVG_NS = 'http://www.w3.org/2000/svg';

const loop = (func) => {
  const step = (timestamp) => {
    requestAnimationFrame(step);
    func(timestamp);
  };
  return { start: () => step(0) };
};

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

const update = (timestamp) => {

};

loop(update).start();
