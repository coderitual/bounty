const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

let y = 100;

const drawMotionText = ({ text, x, y, iterations = 20 }) => {
  ctx.save();
  for (let i = 0; i < iterations; i++) {
    const pos = i - iterations / 2;
    ctx.globalAlpha = 0.1 - 0.01 * Math.abs(pos);
    ctx.fillText(text, x, y + pos * 5);
  }
  ctx.restore();
};

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.save();
  // const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  // gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  // gradient.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
  // gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
  // ctx.fillStyle = gradient;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.restore();

  ctx.fillStyle = '#FFF';
  ctx.font = 'bold 100px Arial Black';

  drawMotionText({ text: '0', x: 0, y });

  y++;
  if (y > 300) {
    y = 0;
  }
};

const loop = () => {
  requestAnimationFrame(loop);
  update();
};

loop();
