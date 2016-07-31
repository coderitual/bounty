import loop from './loop';
import { select, append, attr, style, text } from './selection';

const fontHeight = 85;
const height = 100;

const createDigitRoulette = (svg) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const roulette = svg::append('g');
  digits.forEach((el, i) => {
    roulette::append('text')
      ::attr('y', -i * height)
      ::style('fill', '#fff')
      ::style('font-size', `${fontHeight}px`)
      ::text(el)
  });
  return roulette;
};

const svg = select('.js-odoo')::append('svg')
  ::attr('width', 800)
  ::attr('height', height);

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
  const offset = fontHeight + (height - fontHeight) / 2;
  const y = offset + 0 / 10 % 1000;
  digit::attr('transform', `translate(0, ${y})`)
  //select('#motionFilter .blurValues')::attr('stdDeviation', `0 ${timestamp / 1000}`);
};

loop(update).start();
