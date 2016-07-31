import loop from './loop';
import { select, append, attr, style, text } from './selection';
import transition from './transition';

const DIGITS_COUNT = 10;
const ROTATIONS = 3;

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

export default function({ el, value }) {
  const element = select(el);
  const computedStyle = window.getComputedStyle(element);
  const fontSize = parseInt(computedStyle.fontSize, 10);
  const marginBottom = fontSize / 10;
  const offset = fontSize - marginBottom;
  const letterSpacing = 1.3;

  let canvasWidth = 0;
  const canvasHeight = fontSize;

  const svg = select(el)::append('svg')
  const defs = svg::append('defs');

  const values = String(value).split('').map(value => parseInt(value, 10));
  const digits = values.map((digit, i) => ({
    node: createDigitRoulette(svg, fontSize, i),
    filter: createFilter(defs, i),
    value: digit,
    offset: { x: 0, y: offset }
  }));

  digits.forEach(digit => {
    const { width } = digit.node.getBoundingClientRect();
    digit.offset.x = canvasWidth;
    digit.node::attr('transform', `translate(${digit.offset.x}, ${digit.offset.y})`);
    canvasWidth += width * letterSpacing;
  });

  svg::attr('width', canvasWidth)
    ::attr('height', canvasHeight)
    ::attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)
    ::style('overflow', 'hidden');

  const transitions = [];
  digits.forEach((digit, id) => {
    const targetDistance = (ROTATIONS * DIGITS_COUNT + digit.value) * fontSize;
    const digitTransition = transition({
      from: 0,
      to: targetDistance,
      step(value) {
        const y = digit.offset.y + value % (fontSize * DIGITS_COUNT);
        digit.node::attr('transform', `translate(${digit.offset.x}, ${y})`);
        const filterOrigin = targetDistance / 2;
        const motionValue = Math.abs(Math.abs(value - filterOrigin) - filterOrigin) / 100;
      }
    });
    transitions.push(digitTransition);
  });

  const update = (timestamp) => {
    transitions.forEach(transition => transition.update(timestamp));
  };

  loop(update).start();

};
