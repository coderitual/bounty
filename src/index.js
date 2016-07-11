const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

let y = 0;
let iterations = 40;

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = 'bold 100px Arial Black';

  for (let i = 0; i < iterations; i++) {
    const pos = i - iterations / 2;
    ctx.globalAlpha = 0.1 - 0.01 * Math.abs(pos);
    ctx.fillText('0', 0, y + pos * 3);
  }

  y+=1;
  if (y > 300) {
    y = 0;
  }
};

const loop = () => {
  requestAnimationFrame(loop);
  update();
};

loop();
