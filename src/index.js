const canvas = document.createElement('canvas');
canvas.height = 600;
canvas.width = 1500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const rotate = (index, max) => {
  if (index < 0) {
    return max + (index);
  } else if (index >= max) {
    return index % (max);
  }
  return index;
};

const blurMap = {
  1: [1, 0],
  2: [0.9, 0.1],
  3: [0.7, 0.25],
  4: [0.6, 0.2],
  5: [0.5, 0.1],
  6: [0.5, 0.09],
  7: [0.4, 0.07],
  8: [0.4, 0.06],
  9: [0.2, 0.02],
  10: [0.2, 0.02]
};

const drawMotionText = ({ text, x, y, blur = 10 }) => {
  const iterations = blur * 2;
  const [start, modifier] = blurMap[blur];
  for (let i = 0; i < iterations; i++) {
    const pos = i - iterations / 2;
    ctx.globalAlpha = start - modifier * Math.abs(pos);
    ctx.fillText(text, x, y + pos * 5);
  }
};

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const DIGITS_COUNT = DIGITS.length;

const fontHeight = 300;

const createDigitRoutlette = (originX = 0) => {
  const targetIndex = 5;
  const targetRounds = 1;
  const startIndex = 0;
  const originY = HEIGHT / 2;

  let currentIndex = startIndex;
  const pathLength = (targetRounds * DIGITS_COUNT + targetIndex) * fontHeight;
  let pathY = 0;

  let y = pathY;
  const x = originX;

  const update = () => {
    pathY += 0;
    const offset = fontHeight / 2;
    y = (pathY + offset) % (HEIGHT / 2);
    currentIndex = rotate(((pathY + offset) / (HEIGHT / 2)) | 0, DIGITS_COUNT);

    drawMotionText({
      text: DIGITS[currentIndex],
      x,
      y: y + originY - offset
    });
    drawMotionText({
      text: DIGITS[(rotate(currentIndex - 1, DIGITS_COUNT))],
      x,
      y: y + fontHeight + originY - offset
    });
    drawMotionText({
      text: DIGITS[(rotate(currentIndex + 1, DIGITS_COUNT))],
      x,
      y: y - fontHeight + originY - offset
    });
  };

  return { update };
};

const digit = createDigitRoutlette();
const digit2 = createDigitRoutlette(200);
const digit3 = createDigitRoutlette(400);

const update = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = '#FFF';
  ctx.font = `bold ${fontHeight}px ITV Reem`;
  // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  // ctx.shadowOffsetX = 2;
  // ctx.shadowOffsetY = 2;
  // ctx.shadowBlur = 10;
  ctx.textBaseline = 'middle';
  digit.update();
  digit2.update();
  digit3.update();
};

const loop = () => {
  requestAnimationFrame(loop);
  update();
};

loop();
