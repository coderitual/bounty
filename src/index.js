import loop from './loop';
import { select, append, attr, style, text } from './selection';

const createDigitRoulette = (svg) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const roulette = svg::append('g');
  digits.forEach((el, i) => {
    roulette::append('text')
      ::attr('y', -i * 100)
      ::style('fill', '#fff')
      ::style('font-size', '85px')
      ::style('text-shadow', '2px 2px 10px rgba(0, 0, 0, 0.5)')
      ::text(el)
  });
  return roulette;
};

const svg = select('.js-odoo')::append('svg')
  ::attr('width', 800)
  ::attr('height', 800);

const defs = svg::append('defs');

defs::append('filter')
	::attr('id', 'motionFilter')
	::attr('width', '300%')
	::attr('x', '-100%')
	::append('feGaussianBlur')
	::attr('class', 'blurValues')
	::attr('in', 'SourceGraphic')
	::attr('stdDeviation', '0 1');

const digit = createDigitRoulette(svg)
  ::style('filter', 'url(#motionFilter)')

const update = (timestamp) => {
  digit::attr('transform', `translate(0, ${(timestamp / 10) % 1000})`)
  select('#motionFilter .blurValues')::attr('stdDeviation', `0 ${timestamp / 1000}`);
};

loop(update).start();
