const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

let y = 0;

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px Arial';
  ctx.fillText('0', 0, y);
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
