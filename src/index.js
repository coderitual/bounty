import loop from './loop';
import namespaces from './namespaces';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const createDigitRoutlette = () => {
  const update = () => {
  };

  return { update };
};

const digit = createDigitRoutlette();

// example

const container = document.querySelector('.js-odoo');
const svg = document.createElementNS(namespaces.svg, 'svg');
svg.setAttribute('width', 400);
svg.setAttribute('height', 300);
container.appendChild(svg);

const letter = document.createElementNS(namespaces.svg, 'text');
letter.setAttribute('y', 100);
letter.style = `fill: #fff;
                font-size: 85px;
                text-shadow: 2px 2px 10px rgba(0,0,0,.5);
                filter: url('#blurMe')"`;

const textNode = document.createTextNode('0');
letter.appendChild(textNode);
svg.appendChild(letter);

const update = (timestamp) => {
  letter.setAttribute('transform', `translate(0, ${timestamp / 100})`);
};

loop(update).start();
