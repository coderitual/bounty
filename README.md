# bounty
[![NPM version][npm-version-image]][npm-url] [![NPM version][npm-license-image]][npm-url]
> JavaScript odometer or slot machine effect library for smoothly transitioning numbers with motion blur. Library uses functional approach and ES7 Function Bind Syntax. Internally based on SVG.

<p align="center"><img src ="docs/logo.gif"/></p>

[See the live version](https://coderitual.github.io/bounty/examples/)

## Installation
To install the stable version:

`npm install --save bounty`

## Examples
The API is really simple and straigthforward:
```js
import bounty from `bounty`;

bounty({ el: '.js-bounty', value: '£42,000,000' });
```

You can use it with other **options**:
```js
import bounty from `bounty`;

bounty({
  el: '.js-bounty',
  value: '£42,000,000',
  initialValue: '£900,000',
  lineHeight: 1.35,
  letterSpacing: 1,
  animationDelay: 100,
  letterAnimationDelay: 100
});
```
If you want to **cancel** the ongoing animation just call returned function:
```js
import bounty from `bounty`;

const cancel = bounty({ el: '.js-bounty', value: '£42,000,000' });
cancel();
```

Library is built using UMD thus the following usage in HTML is possible.

```html
<div class="js-bounty"></div>
<script src="/bounty.js"></script>
<script>
  bounty.default({ el: '.js-bounty', value: '£42,000,000' })
</script>
```

The UMD build is also available on unpkg:

```html
<script src="https://unpkg.com/bounty@1.1.6/lib/bounty.js"></script>
```
You can find the library on `window.bounty`.

## That's it?
Yea! That's it. Other options like `font-family` and `font-size` are taken from **computed styles** so you can just style it like the other layers.
```css
.js-bounty {
  font-size: 60px;
  font-family: Roboto;
  fill: #fff;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}
```

## Roadmap
There is a work in progress to implement additional features:
* [ ] `from` `to` API.
* [ ] Full ASCII transition support.
* [ ] Control animation.
* [ ] Introduce Webcomponents API `<svg-bounty>`

<p align="center"><img src ="docs/example2.gif"/></p>

## License
The library is available under the MIT license. For more info, see the [LICENSE](LICENSE) file.

[npm-version-image]: https://img.shields.io/npm/v/bounty.svg
[npm-license-image]: https://img.shields.io/npm/l/bounty.svg
[npm-url]: https://www.npmjs.com/package/bounty
