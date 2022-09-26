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
_FlowBlocks.prototype.for_each = {
  text: 'For Each',
  type: 'sink',
  kind: 'normal',
  source: 'original',
  description: 'Run function using value for each element',
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
      description: 'Function to run',
      type: ['object', 'func'],
    },
  ],
  outputNodes: null,
  default: [0, null],
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  eval_block: {
    func: args => {
      return `sink::for_each(${args})`
    },
  },
}
_FlowBlocks.prototype.sink_max = {
  text: 'Max',
  type: 'sink',
  kind: 'normal',
  source: 'original',
  description: 'Set the variable to the maximum value',
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
      return `sink::max(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
}
_FlowBlocks.prototype.min = {
  text: 'Min',
  type: 'sink',
  kind: 'normal',
  source: 'original',
  description: 'Set the variable to the minimum value',
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
      return `sink::min(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
}
_FlowBlocks.prototype.sink_set_var = {
  text: 'Set Var',
  type: 'sink',
  kind: 'normal',
  source: 'original',
  description: 'Sets the variable to the incoming value',
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
  default: [undefined],
  eval_block: {
    pipeline_type: 'sink',
    type: 'component',
    func: data => {
      return `sink::set_var(${data})`
    },
  },
}
_FlowBlocks.prototype.out_block = {
  text: 'Out',
  type: 'sink',
  kind: 'inline',
  source: 'original',
  description: 'For use in the function factory (exit point)',
  inputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [undefined],
  eval_block: {
    func: data => {
      return ``
    },
  },
  inlineData: [],
}
_FlowBlocks.prototype.sink_dummy = {
  text: 'Dummy',
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
  default: ['...'],
  eval_block: {
    func: data => {
      return `sink::/*${data}*/()`
    },
  },
  inlineData: [
    {
      name: 'Text',
      description: 'Number of values to take',
      type: ['object', 'string'],
    },
  ],
}
