import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.printf = {
  text: 'Printf',
  type: 'sink',
  kind: 'iinput',
  source: 'original',
  description: 'Take a given number of values from the generator',
  inputNodes: [
    {
      text: 'In',
      name: 'in',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: ['%d\\n'], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'sink',
    type: 'component',
    func: data => {
      return `sink::printf("${data}")`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
  // 'slider' kind block special
  inlineData: [
    {
      name: 'Take',
      description: 'Number of values to take',
      type: ['object', 'string'],
    },
  ],
}
_FlowBlocks.prototype.sum = {
  text: 'Sum',
  type: 'sink',
  kind: 'normal',
  source: 'original',
  description: 'Take a given number of values from the generator',
  inputNodes: [
    {
      text: 'In',
      name: 'in',
      description: 'The incoming value',
      type: ['number'],
    },
    {
      text: 'Var',
      name: 'var',
      description: 'Variable',
      type: ['object', 'func'],
    },
  ],
  outputNodes: null,
  default: [undefined], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'sink',
    type: 'component',
    func: data => {
      return `sink::sum(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
}
_FlowBlocks.prototype.hole = {
  text: 'Hole',
  type: 'sink',
  kind: 'inline',
  source: 'original',
  description: 'Discards the incoming value',
  inputNodes: [
    {
      text: 'In',
      name: 'in',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [], // default here is for default inline data instead of input
  eval_block: {
    func: data => {
      return `sink::hole()`
    },
  },
  // 'slider' kind block special
  inlineData: [
    {
      name: 'Take',
      description: 'Number of values to take',
      type: ['object', 'string'],
    },
  ],
}
