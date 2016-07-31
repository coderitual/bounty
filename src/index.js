import loop from './loop';
import { select, append, attr, style, text } from './selection';

const fontSize = 150;
const lineHeight = fontSize;
const marginBottom = 5;
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
  ::attr('width', 800)
  ::attr('height', lineHeight);

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
  const offset = lineHeight - marginBottom;
  const y = offset + timestamp / 10 % (lineHeight * digits);
  digit::attr('transform', `translate(0, ${y})`)
  //select('#motionFilter .blurValues')::attr('stdDeviation', `0 ${timestamp / 1000}`);
};

loop(update).start();
