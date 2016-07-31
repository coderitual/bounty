const cubicInOut = (t) => ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
const linear = t => +t;

export default ({
  from,
  to,
  duration = 4000,
  easing = cubicInOut,
  start = (v) => v,
  step = (v) => v,
  end = (v) => v
}) => {
  let value = from;
  let startTime = 0;
  let finished = false;
  const update = (timestamp) => {
    if(finished) {
      return;
    }
    if(!startTime) {
      startTime = timestamp;
      start(value);
    }
    const t = Math.min(timestamp - startTime, duration) / duration;
    value = easing(t) * (to - from) + from;
    step(value);
    if(t === 1) {
      finished = true;
      end(value);
    }
  }
  return { update };
};
