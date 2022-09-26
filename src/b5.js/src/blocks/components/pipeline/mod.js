import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.mod_take = {
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
  default: [50],
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: data => {
      if (data.length > 1) {
        return `mod::take(${data.slice(0, -1)},\n  ${data.slice(-1)})`
      }
      return `mod::take(\n  ${data})`
    },
  },
  inlineData: [
    {
      name: 'Take',
      description: 'Number of values to take',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.mod_flag = {
  text: 'Flag',
  type: 'mod',
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
      text: 'Flag',
      name: 'flag',
      description: 'Continue flag',
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
  default: [null],
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: data => {
      if (data.length > 1) {
        return `mod::flag(${data.slice(0, -1)},\n  ${data.slice(-1)})`
      }
      return `mod::flag(\n  ${data})`
    },
  },
}
_FlowBlocks.prototype.mod_noise = {
  text: 'Noise',
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
  default: [0], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: data => {
      if (data.length > 1) {
        return `mod::noise(${data.slice(0, -1)},\n  ${data.slice(-1)})`
      }
      return `mod::noise(\n  ${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
  // 'slider' kind block special
  inlineData: [
    {
      name: 'Noise +-',
      description: 'Noise from value',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.mod_repeat = {
  text: 'Repeat',
  type: 'mod',
  kind: 'inline',
  source: 'original',
  description: 'Repeats the generator',
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
  default: [], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: data => {
      return `mod::repeat(\n  ${data[1]})`
    },
  },
}
_FlowBlocks.prototype.mod_random_err = {
  text: 'Random Error',
  type: 'mod',
  kind: 'iinput',
  source: 'original',
  description: 'Inserts random errors into the data',
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
  default: [0.0, 0, null], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: data => {
      if (data.length > 1) {
        return `mod::random_err(${data.slice(0, -1)},\n  ${data.slice(-1)})`
      }
      return `mod::take(\n${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
  // 'slider' kind block special
  inlineData: [
    {
      name: 'Chance',
      description: 'Number of values to take',
      type: ['object', 'number'],
    },
    {
      name: 'e',
      description: 'Number of values to take',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.mod_dummy = {
  text: 'Dummy',
  type: 'mod',
  kind: 'iinput',
  source: 'original',
  description: 'Placeholder block',
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
  default: ['...'], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: data => {
      if (data.length > 1) {
        return `mod::/*${data.slice(0, -1)}*/(\n  ${data.slice(-1)})`
      }
      return `mod:://${data})`
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
