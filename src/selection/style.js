export default function(name, value, priority = '') {
  this.style.setProperty(name, value, priority);
  return this;
}
