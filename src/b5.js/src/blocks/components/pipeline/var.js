import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.num_var = {
  text: 'Number',
  type: 'variable',
  kind: 'iinput',
  source: 'original',
  description: 'Take a given number of values from the generator',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'value',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0, 'int64_t'], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: data => {
      return `pipe::take(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
  inlineData: [
    {
      name: '',
      description: 'Number of values to take',
      type: ['object', 'string'],
    },
    {
      name: '',
      description: 'Number of values to take',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.str_var = {
  text: 'String',
  type: 'variable',
  kind: 'iinput',
  source: 'original',
  description: 'Take a given number of values from the generator',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'value',
      description: 'The new value',
      type: ['object', 'string'],
    },
  ],
  default: ['"Hello world!"', 'std::string'], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: data => {
      return `pipe::take(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
  inlineData: [
    {
      name: '',
      description: 'Number of values to take',
      type: ['object', 'string'],
    },
    {
      name: '',
      description: 'Number of values to take',
      type: ['object', 'string'],
    },
  ],
}
_FlowBlocks.prototype.vector_var = {
  text: 'Vector',
  type: 'variable',
  kind: 'inline',
  source: 'original',
  description: 'Take a given number of values from the generator',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'value',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: ['{}', 'std::vector<int>'], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: data => {
      return `pipe::take(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
}
