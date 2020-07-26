const cubicInOut = (t) =>
  ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;

export default ({
  from,
  to,
  duration = 3000,
  delay = 0,
  easing = cubicInOut,
  start = (v) => v,
  step = (v) => v,
  end = (v) => v,
}) => {
  let value = from;
  let startTime = 0;
  let paused = false;
  let prevTime = 0;
  let finished = false;
  const update = (timestamp) => {
    if (finished) {
      return;
    }
    if (!startTime) {
      startTime = timestamp;
      prevTime = timestamp;
      start(value);
    }

    if (paused) {
      startTime += timestamp - prevTime;
    }

    const t =
      Math.min(Math.max(timestamp - startTime - delay, 0), duration) / duration;
    value = easing(t) * (to - from) + from;
    step(value);
    if (t === 1) {
      finished = true;
      end(value);
    }

    prevTime = timestamp;
  };

  const pause = () => {
    paused = true;
  };
  const resume = () => {
    paused = false;
  };

  return { update, pause, resume };
};
