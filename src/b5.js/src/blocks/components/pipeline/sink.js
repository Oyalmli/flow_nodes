import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.printf = {
  text: 'Printf',
  type: 'sink',
  kind: 'normal',
  source: 'original',
  description: 'Creates a range from low to high with the given step size',
  inputNodes: [
    {
      text: 'In',
      name: 'in',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  sideNode: [
    {
      text: 'Func',
      name: 'func',
      description: 'Function to apply',
      type: ['object', 'func'],
    },
  ],
  outputNodes: null,
  default: ['%d\n'],
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}
