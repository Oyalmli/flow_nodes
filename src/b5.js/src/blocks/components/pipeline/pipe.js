import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.transform = {
  text: 'Transfrom',
  type: 'pipe',
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
    {
      text: 'Func',
      name: 'func',
      description: 'Function to apply',
      type: ['object', 'func'],
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
  outputNodes: [
    {
      text: 'Out',
      name: 'out',
      description: 'the outgoing value',
      type: ['object', 'number'],
    },
  ],
  default: [0, null],
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}
