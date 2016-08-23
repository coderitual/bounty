Odoo: SVG Odomoter Effect Library
======
Crazy SVG odometer effect library. Library uses functional approach and ES7 Function Bind Syntax. Internals strongly inspired by d3.js library.

[Demo](https://coderitual.github.io/odoo/examples/)

Examples
======
The API is really simple and straigthforward:
```js
odoo.default({ el: '.js-odoo', value: '£42,000,000' });
```

You can use it with other **options**:
```js
odoo.default({
  el: '.js-odoo',
  value: '£42,000,000',
  lineHeight = 1.35,
  letterSpacing = 1,
  animationDelay = 100,
  letterAnimationDelay = 100
});
```

That's it?
=====
Yea! That's it. Other options like `font-family` and `font-size` is taken from **computed styles** so you can just style it like the other layers.
