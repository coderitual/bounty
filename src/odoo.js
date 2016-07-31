import loop from './loop';
import { select, append, attr, style, text } from './selection';
import transition from './transition';

const DIGITS_COUNT = 10;

const createDigitRoulette = (svg, fontSize, id) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const roulette = svg::append('g')::attr('id', `digit-${id}`);
  digits.forEach((el, i) => {
    roulette::append('text')
      ::attr('y', -i * fontSize)
      ::style('fill', '#fff')
      ::style('font-size', `${fontSize}px`)
      ::style('filter', `url(#motionFilter-${id})`)
      ::text(el);
  });
  return roulette;
};

const createFilter = (defs, id) => defs::append('filter')
	::attr('id', `motionFilter-${id}`)
	::attr('width', '300%')
	::attr('x', '-100%')
	::append('feGaussianBlur')
	::attr('class', 'blurValues')
	::attr('in', 'SourceGraphic')
	::attr('stdDeviation', '0 0');

export default function({el, value}) {
  const element = select(el);
  const computedStyle = window.getComputedStyle(element);
  const fontSize = parseInt(computedStyle.fontSize, 10);
  const marginBottom = fontSize / 10;
  const offset = fontSize - marginBottom;

  let canvasWidth = 0;
  const canvasHeight = fontSize;

  const svg = select(el)::append('svg')
  const defs = svg::append('defs');

  const values = String(value).split('').map(value => parseInt(value, 10));
  const digits = values.map((digit, i) => ({
    node: createDigitRoulette(svg, fontSize, i),
    filter: createFilter(defs, i),
    value: digit
  }));

  digits.reduce((prev, current) => {
    const { width } = current.node.getBoundingClientRect();
    canvasWidth += width;
    if(prev.node) {
      current.node
        ::attr('x', canvasWidth)
        ::attr('transform', `translate(0, ${offset})`);
    }
    return current;
  }, {});

  svg::attr('width', canvasWidth)
    ::attr('height', canvasHeight)
    ::attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)
    ::style('overflow', 'hidden');

  const transitions = [];

  const targetDistance = 37 * fontSize;
  const digitTransition = transition({
    from: 0,
    to: targetDistance,
    step(v) {
      const y = offset + v % (fontSize * DIGITS_COUNT);
      digit::attr('transform', `translate(0, ${y})`);
      const filterOrigin = targetDistance / 2;
      const motionValue = Math.abs(Math.abs(v - filterOrigin) - filterOrigin) / 100;
      console.log(motionValue)
      select('#motionFilter .blurValues')::attr('stdDeviation', `0 ${motionValue}`);
    }
  });

  const update = (timestamp) => {
    transitions.forEach(transition => transition.update(timestamp));
  };

  loop(update).start();

};
