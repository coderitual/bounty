const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

let y = 100;

const drawMotionText = ({ text, x, y, iterations = 40 }) => {
  for (let i = 0; i < iterations; i++) {
    const pos = i - iterations / 2;
    ctx.globalAlpha = 0.1 - 0.01 * Math.abs(pos);
    ctx.fillText(text, x, y + pos * 5);
  }
};

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#FFF';
  ctx.font = 'bold 100px Arial Black';

  drawMotionText({ text: '0', x: 0, y });

  if (y > 300) {
    y = 0;
  }
};

const loop = () => {
  requestAnimationFrame(loop);
  update();
};

loop();
