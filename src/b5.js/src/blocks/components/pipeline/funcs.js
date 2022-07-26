import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.addValue = {
  text: 'Add value',
  type: 'func',
  kind: 'input',
  source: 'original',
  description: 'Adds to incoming value',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0],
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'add',
      description: 'The value of number.',
      type: ['object', 'number'],
    },
  ],
}
