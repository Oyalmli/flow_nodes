import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.transform = {
  text: 'Transform',
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
  outputNodes: [
    {
      text: 'Out',
      name: 'out',
      description: 'the outgoing value',
      type: ['object', 'number'],
    },
  ],
  default: [0, null],
  eval_block: {
    pipeline_type: 'pipe',
    type: 'component',
    func: args => {
      return `pipe::transform(${args})`
    },
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}

_FlowBlocks.prototype.partition = {
  text: 'Partition',
  type: 'redirect',
  kind: 'normal',
  source: 'original',
  description: 'Partitions based on test',
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
      description: 'Partition function',
      type: ['object', 'func'],
    },
  ],
  outputNodes: [
    {
      text: 'True',
      name: 'true',
      description: 'the outgoing value',
      type: ['object', 'number'],
    },
    {
      text: 'False',
      name: 'false',
      description: 'the outgoing value',
      type: ['object', 'number'],
    },
  ],
  default: [0, null],
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  eval_block: {
    pipeline_type: 'pipe',
    type: 'component',
    func: ([func, a, b]) => {
      return `pipe::partition(${func},\n\t${a}, \n\t${b})`
    },
  },
}

_FlowBlocks.prototype.take = {
  text: 'Take',
  type: 'pipe',
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
  default: [50], // default here is for default inline data instead of input
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
  // 'slider' kind block special
  inlineData: [
    {
      name: 'Take',
      description: 'Number of values to take',
      type: ['object', 'number'],
    },
  ],
}
