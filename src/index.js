import loop from './loop';
import { select, append, attr, style, text } from './selection';

const width = 800;
const fontSize = 85;
const height = fontSize;
const marginBottom = 10;
const digits = 10;

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

const digit = createDigitRoulette(svg)
  ::style('filter', 'url(#motionFilter)')

const update = (timestamp) => {
  const offset = height - marginBottom;
  const y = offset + 0 / 1 % (height * digits);
  digit::attr('transform', `translate(0, ${y})`)
  //select('#motionFilter .blurValues')::attr('stdDeviation', `0 ${timestamp / 1000}`);
};

loop(update).start();
