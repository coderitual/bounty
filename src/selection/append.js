import namespaces from './namespaces';

export default function(type) {
  const element = document.createElementNS(namespaces.svg, type);
  this.appendChild(element);
  return element;
}
