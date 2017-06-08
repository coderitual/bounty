import odoo from './odoo';

export default class SvgOdoo extends HTMLElement {
  constructor() {
    super();
    this._cancel = null;
  }

  static get observedAttributes() {
    return ['from', 'to'];
  }

  connectedCallback() {
    this._cancel = odoo({ element: this, from: this.getAttribute('from'), to: this.getAttribute('to') });
  }

  disconnectedCallback() {
    this._cancel();
  }

  attributeChangedCallback(name) {
    this._cancel = odoo({ element: this, from: this.getAttribute('from'), to: this.getAttribute('to') });
  }

  set from(value) { this.setAttribute('from', value); }
  get from() { return this.getAttribute('from'); }

  set to(value) { this.setAttribute('to', value); }
  get to() { return this.getAttribute('to'); }
};

customElements.define('svg-odoo', SvgOdoo);
