import loop from './loop';
import { select, append, attr, style, text } from './selection';
import transition from './transition';

const DIGITS_COUNT = 10;
const ROTATIONS = 3;

const createDigitRoulette = (svg, fontSize, lineHeight, id) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const roulette = svg::append('g')
    ::attr('id', `digit-${id}`)
    ::style('filter', `url(#motionFilter-${id})`);

  digits.forEach((el, i) => {
    roulette::append('text')
      ::attr('y', -i * fontSize * lineHeight)
      ::text(el);
  });
  return roulette;
};

const createCharacter = (svg, el, fontSize) => svg
  ::append('g')
  ::append('text')
  ::style('filter', `url(#createShadowFailFilter)`)
  ::text(el);

const createFilter = (defs, id) => defs::append('filter')
	::attr('id', `motionFilter-${id}`)
	::attr('width', '300%')
	::attr('x', '-100%')
	::append('feGaussianBlur')
    ::attr('class', 'blurValues')
    ::attr('in', 'SourceGraphic')
    ::attr('stdDeviation', '0 0');

const createShadowFailFilter = (defs) => defs::append('filter')
	::attr('id', `createShadowFailFilter`)
	::attr('width', '300%')
	::attr('x', '-100%')
  	::append('feGaussianBlur')
    ::attr('stdDeviation', '0 0');

const createGradient = (defs, id) => defs::append('linearGradient')
  ::attr('id', `gradient-${id}`)
  ::attr('x1', '0%')
  ::attr('y1', '0%')
  ::attr('x2', '0%')
  ::attr('y2', '100%')
  ::append('stop')
    ::attr('offset', '0')
    ::attr('stop-color', 'white')
    ::attr('stop-opacity', '0')
  ::select(`#gradient-${id}`)
  ::append('stop')
    ::attr('offset', '0.2')
    ::attr('stop-color', 'white')
    ::attr('stop-opacity', '1')
  ::select(`#gradient-${id}`)
  ::append('stop')
    ::attr('offset', '0.8')
    ::attr('stop-color', 'white')
    ::attr('stop-opacity', '1')
  ::select(`#gradient-${id}`)
  ::append('stop')
    ::attr('offset', '1')
    ::attr('stop-color', 'white')
    ::attr('stop-opacity', '0');

const createMask = (defs, id) => defs::append('mask')
  ::attr('id', `mask-${id}`)
  ::append('rect')
  ::attr('x', 0)
  ::attr('y', 0)
  ::attr('width', '100%')
  ::attr('height', '100%')
  ::attr('fill', `url(#gradient-${id})`);

const setViewBox = (svg, width, height) => {
  svg::attr('width', width)
  svg::attr('height', height)
  svg::attr('viewBox', `0 0 ${width} ${height}`)
  svg::style('overflow', 'hidden');
}

export default ({
  el,
  value,
  lineHeight = 1.35,
  letterSpacing = 1,
  animationDelay = 100,
  letterAnimationDelay = 100
}) => {
  const element = select(el);
  const computedStyle = window.getComputedStyle(element);
  const fontSize = parseInt(computedStyle.fontSize, 10);
  const marginBottom = (fontSize * lineHeight - fontSize) / 2 + fontSize / 10;
  const offset = fontSize * lineHeight - marginBottom;
  const salt = Date.now();

  let canvasWidth = 0;
  const canvasHeight = fontSize * lineHeight + marginBottom;

  element.innerHTML = '';
  const root = element::append('svg');
  const svg = root::append('svg')::attr('mask', `url(#mask-${salt})`)
  const defs = root::append('defs');
  createGradient(defs, salt);
  createMask(defs, salt);
  createShadowFailFilter(defs);

  const values = String(value)
    .replace(/ /g, '\u00a0')
    .split('');

  const chars = values.map((char, i) => {
    const id = `${i}-${salt}`;
    if(isNaN(parseInt(char, 10))) {
      return {
        isDigit: false,
        node: createCharacter(svg, char, fontSize),
        value: char,
        offset: { x: 0, y: offset }
      };
    } else {
      return {
        isDigit: true,
        id: id,
        node: createDigitRoulette(svg, fontSize, lineHeight, id),
        filter: createFilter(defs, id),
        value: Number(char),
        offset: { x: 0, y: offset }
      };
    }
  });

  const transitions = [];
  const digits = chars.filter(char => char.isDigit);
  digits.forEach((digit, i) => {
    const targetDistance = (ROTATIONS * DIGITS_COUNT + digit.value) * (fontSize * lineHeight);
    const digitTransition = transition({
      from: 0,
      to: targetDistance,
      delay: (digits.length - 1 - i) * letterAnimationDelay + animationDelay,
      step(value) {
        digit.offset.y = offset + value % ((fontSize * lineHeight) * DIGITS_COUNT);
        digit.node::attr('transform', `translate(${digit.offset.x}, ${digit.offset.y})`);
        const filterOrigin = targetDistance / 2;
        const motionValue = Math.abs(Math.abs(value - filterOrigin) - filterOrigin) / 100;
        digit.filter::attr('stdDeviation', `0 ${motionValue}`);
      },
      end: i === 0 ? () => cancelAnimation() : (e) => e
    });
    transitions.push(digitTransition);
  });

  const update = (timestamp) => {
    canvasWidth = 0;
    chars.forEach(char => {
      const { width } = char.node.getBBox();
      char.offset.x = canvasWidth;
      canvasWidth += width + letterSpacing;
    });

    chars.forEach(char => {
      char.node::attr('transform', `translate(${char.offset.x}, ${char.offset.y})`);
    });

    setViewBox(root, canvasWidth, canvasHeight);
    transitions.forEach(transition => transition.update(timestamp));
  };

  const cancelAnimation = loop(update);
  return cancelAnimation;
};