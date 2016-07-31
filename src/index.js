import loop from './loop';
import { select, append, attr, style, text } from './selection';

const fontSize = 85;
const marginBottom = fontSize / 10;
const digits = 10;

const width = 800;
const height = fontSize;

const createDigitRoulette = (svg) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const roulette = svg::append('g');
  digits.forEach((el, i) => {
    roulette::append('text')
      ::attr('y', -i * fontSize)
      ::style('fill', '#fff')
      ::style('font-size', `${fontSize}px`)
      ::text(el)
  });
  return roulette;
};

const svg = select('.js-odoo')::append('svg')
  ::attr('width', width)
  ::attr('height', height)
  ::attr('viewBox', `0 0 ${width} ${height}`)
  ::style('overflow', 'hidden')

const defs = svg::append('defs');

defs::append('filter')
	::attr('id', 'motionFilter')
	::attr('width', '300%')
	::attr('x', '-100%')
	::append('feGaussianBlur')
	::attr('class', 'blurValues')
	::attr('in', 'SourceGraphic')
	::attr('stdDeviation', '0 0');

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

function linear(t) {
  return +t;
}

const transition = ({
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

const digit = createDigitRoulette(svg)
  ::style('filter', 'url(#motionFilter)');

const targetDistance = 37 * fontSize;
const digitTransition = transition({
  from: 0,
  to: targetDistance,
  step: (v) => {
    const offset = fontSize - marginBottom;
    const y = offset + v % (fontSize * digits);
    digit::attr('transform', `translate(0, ${y})`);
    const filterOrigin = targetDistance / 2;
    const motionValue = Math.abs(Math.abs(v - filterOrigin) - filterOrigin) / 100;
    console.log(motionValue)
    select('#motionFilter .blurValues')::attr('stdDeviation', `0 ${motionValue}`);
  }
});

const update = (timestamp) => {
  digitTransition.update(timestamp);
};

loop(update).start();
