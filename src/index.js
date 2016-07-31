import loop from './loop';
import { select, append, attr, style, text } from './selection';

const fontSize = 150;
const marginBottom = fontSize / 10;
const digits = 10;

const width = 800;
const height = fontSize + 100;

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

const transition = ({ from, to, duration = 1000, easing = cubicInOut }) => {
  let value = from;
  let startTime = 0;

  const update = (timestamp) => {
    if(!startTime) {
      startTime - timestamp;
    }
    const t = Math.min(timestamp - startTime, duration) / 1000;
    value = easing(t);
  }

  return { update };
};

const digit = createDigitRoulette(svg)
  ::style('filter', 'url(#motionFilter)')

const update = (timestamp) => {
  const offset = fontSize - marginBottom;
  const y = offset + timestamp / 1 % (fontSize * digits);
  digit::attr('transform', `translate(0, ${y})`)
  //select('#motionFilter .blurValues')::attr('stdDeviation', `0 ${timestamp / 1000}`);
};

loop(update).start();
