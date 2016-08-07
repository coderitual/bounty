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

const createCharacter = (svg, el, fontSize) => svg
  ::append('text')
  ::style('fill', '#fff')
  ::style('font-size', `${fontSize}px`)
  ::text(el);

const createFilter = (defs, id) => defs::append('filter')
	::attr('id', `motionFilter-${id}`)
	::attr('width', '300%')
	::attr('x', '-100%')
	::append('feGaussianBlur')
	::attr('class', 'blurValues')
	::attr('in', 'SourceGraphic')
	::attr('stdDeviation', '0 0');

const setViewBox = (svg, width, height) => svg
  ::attr('width', width)
  ::attr('height', height)
  ::attr('viewBox', `0 0 ${width} ${height}`)
  ::style('overflow', 'hidden');

export default function ({ el, value }) {
  const element = select(el);
  const computedStyle = window.getComputedStyle(element);
  const fontSize = parseInt(computedStyle.fontSize, 10);
  const marginBottom = fontSize / 10;
  const offset = fontSize - marginBottom;
  const letterSpacing = 1;
  const animationDelay = 100;

  let canvasWidth = 0;
  const canvasHeight = fontSize + marginBottom;

  const svg = select(el)::append('svg')
  const defs = svg::append('defs');

  const values = String(value).split('');
  const chars = values.map((char, i) => {
    if(isNaN(char)) {
      return {
        isDigit: false,
        node: createCharacter(svg, char, fontSize),
        value: char,
        offset: { x: 0, y: offset }
      };
    } else {
      return {
        isDigit: true,
        id: i,
        node: createDigitRoulette(svg, fontSize, i),
        filter: createFilter(defs, i),
        value: Number(char),
        offset: { x: 0, y: offset }
      };
    }
  });

  const transitions = [];
  const digits = chars.filter(char => char.isDigit);
  console.log(chars, digits)
  digits.forEach((digit, i) => {
    const targetDistance = (ROTATIONS * DIGITS_COUNT + digit.value) * fontSize;
    const digitTransition = transition({
      from: 0,
      to: targetDistance,
      delay: (digits.length - i) * animationDelay,
      step(value) {
        digit.offset.y = offset + value % (fontSize * DIGITS_COUNT);
        digit.node::attr('transform', `translate(${digit.offset.x}, ${digit.offset.y})`);
        const filterOrigin = targetDistance / 2;
        const motionValue = Math.abs(Math.abs(value - filterOrigin) - filterOrigin) / 100;
        select(`#motionFilter-${digit.id} .blurValues`)::attr('stdDeviation', `0 ${motionValue}`);
      }
    });
    transitions.push(digitTransition);
  });

  const update = (timestamp) => {
    let canvasWidth = 0;
    chars.forEach(char => {
      const { width } = char.node.getBoundingClientRect();
      char.offset.x = canvasWidth;
      char.node::attr('transform', `translate(${char.offset.x}, ${char.offset.y})`);
      canvasWidth += width + letterSpacing;
    });

    setViewBox(svg, canvasWidth, canvasHeight);
    transitions.forEach(transition => transition.update(timestamp));
  };

  loop(update).start();
};
