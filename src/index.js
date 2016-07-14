const canvas = document.createElement('canvas');
canvas.height = 900;
canvas.width = 1500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const drawMotionText = ({ text, x, y, iterations = 20 }) => {
  for (let i = 0; i < iterations; i++) {
    const pos = i - iterations / 2;
    ctx.globalAlpha = 0.2 - 0.02 * Math.abs(pos);
    ctx.fillText(text, x, y + pos * 5);
  }
};

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const createDigitRoutlette = () => {
  let currentIndex = 5;
  let y = HEIGHT / 2;

  const fontHeight = 500;

  const update = () => {
    // current
    drawMotionText({ text: DIGITS[currentIndex], x: 0, y });
    // next
    drawMotionText({ text: DIGITS[(currentIndex + 1)], x: 0, y: y + fontHeight });
  };

  return { update };
};

const digit = createDigitRoutlette();

const update = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = '#FFF';
  ctx.font = 'bold 500px Arial Black';
  ctx.textBaseline = 'middle';
  digit.update();
};

const loop = () => {
  requestAnimationFrame(loop);
  update();
};

loop();
