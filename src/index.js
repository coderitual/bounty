import loop from './loop';
import { select, append, attr, style, text } from './selection';

const svg = select('.js-odoo')::append('svg')
  ::attr('width', 400)
  ::attr('height', 300);

const defs = svg::append("defs");

defs::append("filter")
	::attr("id", "motionFilter")
	::attr("width", "300%")
	::attr("x", "-100%")
	::append("feGaussianBlur")
	::attr("class", "blurValues")
	::attr("in", "SourceGraphic")
	::attr("stdDeviation", "0 8");

const letter = svg::append('text')
  ::attr('y', 100)
  ::style('fill', '#fff')
  ::style('font-size', '85px')
  ::style('text-shadow', '2px 2px 10px rgba(0, 0, 0, 0.5)')
  ::style('filter', 'url(#motionFilter)')
  ::text('0')

const update = (timestamp) => {
  letter::attr('transform', `translate(0, ${timestamp / 100})`);
};

loop(update).start();
