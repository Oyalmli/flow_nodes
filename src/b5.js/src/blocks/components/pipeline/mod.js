import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.take = {
  text: 'Take',
  type: 'mod',
  kind: 'iinput',
  source: 'original',
  description: 'Take a given number of values from the generator',
  inputNodes: [
    {
      text: 'In',
      name: 'in',
      description: 'The incoming value',
      type: ['number'],
    },
  ],
  outputNodes: [
    {
      text: 'Out',
      name: 'out',
      description: 'The outgoing value',
      type: ['object', 'number'],
    },
  ],
  default: [50, 0], // default here is for default inline data instead of input
  eval: function (in_idxs, out_idxs, args) {
    if (out_idxs.length !== 0) return
    let contained_string = ''
    for (let o in in_idxs) {
      contained_string += o + ' '
    }
    return `mod::take(${args}, ${contained_string})`
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
  // 'slider' kind block special
  inlineData: [
    {
      name: 'Take',
      description: 'Number of values to take',
      type: ['object', 'number'],
    },
  ],
}
