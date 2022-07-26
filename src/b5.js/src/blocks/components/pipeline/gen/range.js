_b5Blocks.prototype.divMod = {
  text: 'Range',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Range',
  inputNodes: [
    {
      text: 'A',
      name: 'x',
      description: '',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y',
      description: 'The lower boundary.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'quot',
      name: 'quot',
      description: 'The quotient',
      type: ['object', 'number'],
    },
    {
      text: 'remainer',
      name: 'remainder',
      description: 'The remainder',
      type: ['object', 'number'],
    },
  ],
  default: [1, 1],
  run: function (p, o, x, y) {
    o[0] = isValid(x) && isValid(y) ? x / y : this.default[0]
    o[1] = isValid(x) && isValid(y) ? x / y : this.default[1]
  },
}
