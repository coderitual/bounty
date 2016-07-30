import loop from './loop';
import { select, append, attr, style, text } from './selection';

const svg = select('.js-odoo')::append('svg')
  ::attr('width', 400)
  ::attr('height', 300);

const letter = svg::append('text')
  ::attr('y', 100)
  ::style('fill', '#fff')
  ::style('font-size', '85px')
  ::style('text-shadow', '2px 2px 10px rgba(0, 0, 0, 0.5)')
  ::text('0')

const update = (timestamp) => {
  letter::attr('transform', `translate(0, ${timestamp / 100})`);
};

loop(update).start();
