import odoo from './odoo';

export default class SvgOdoo extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['from', 'to'];
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(name) {
  }

};

customElements.define('svg-odoo', SvgOdoo);