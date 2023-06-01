const cubicInOut = (t) =>
  ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;

export default ({
  from,
  to,
  duration = 3000,
  delay = 0,
  continuousRun = false,
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
  let finishNow = false;
  
  const update = (timestamp) => {
    if (finished) {
      return;
    }
    if (!startTime) {
      startTime = timestamp;
      prevTime = timestamp;
      start(value);
    }
    if(continuousRun && finishNow){
      
      duration = timestamp + 3000;
      continuousRun = false;
    }

    if (paused) {
      startTime += timestamp - prevTime;
    }

    const t =
      Math.min(Math.max(timestamp - startTime - delay, 0), duration) / duration;
    value = easing(t) * (to - from) + from;
    //console.log("value in transition: " + value + " : " + to + " : " + from + " : " + t);
    //console.log("duration: " + duration);
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
  const startFinish = () => {
    //console.log("to before: " + to + " :duration: " + duration);
    //to = toValue;
    finishNow = true;
    //startTime = 0;
    //console.log("to after: " + to + " :duration: " + duration);
    
  };

  return { update, pause, resume, startFinish };
};
