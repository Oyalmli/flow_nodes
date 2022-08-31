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
_FlowBlocks.prototype.transform_s = {
  text: 'Transform S',
  type: 'pipe',
  kind: 'normal',
  source: 'original',
  description: 'Transforms with state',
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
    {
      text: 'Var',
      name: 'var',
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
    func: ([func, variable]) => {
      return `pipe::transform_s(${func}, ${variable})`
    },
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
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
      type: ['object', 'number'],
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
_FlowBlocks.prototype.intersperse = {
  text: 'Intersperse',
  type: 'pipe',
  kind: 'iinput',
  source: 'original',
  description: 'Inserts the given value between incoming values',
  inputNodes: [
    {
      text: 'In',
      name: 'in',
      description: 'The incoming value',
      type: ['object', 'number'],
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
    func: data => {
      return `pipe::intersperse(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
  // 'slider' kind block special
  inlineData: [
    {
      name: 'Val',
      description: 'Value to insert',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.chunks = {
  text: 'Chunks',
  type: 'pipe',
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
  outputNodes: [
    {
      text: 'Out',
      name: 'out',
      description: 'The outgoing value',
      type: ['object', 'number'],
    },
  ],
  default: ['int64_t', 10], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: ([tp, size]) => {
      return `pipe::chunks<${tp}, ${size}>()`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
  // 'slider' kind block special
  inlineData: [
    {
      name: 'Type',
      description: 'The type of the incoming value',
      type: ['object', 'string'],
    },
    {
      name: 'Size',
      description: 'The size of the chunk',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.drop_while = {
  text: 'Drop While',
  type: 'pipe',
  kind: 'normal',
  source: 'original',
  description: 'Drops until the test returns true',
  inputNodes: [
    {
      text: 'In',
      name: 'in',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
    {
      text: 'Test',
      name: 'test',
      description: 'Drop check',
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
  eval_block: {
    func: args => {
      return `pipe::drop_while(${args})`
    },
  },
}
_FlowBlocks.prototype.drop = {
  text: 'Drop',
  type: 'pipe',
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
      return `pipe::drop(${data})`
    },
  },
  inlineData: [
    {
      name: 'Drop',
      description: 'Number of values to drop',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.filter = {
  text: 'Filter',
  type: 'pipe',
  kind: 'normal',
  source: 'original',
  description: 'Filter out the values failing the test',
  inputNodes: [
    {
      text: 'In',
      name: 'in',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
    {
      text: 'Test',
      name: 'test',
      description: 'Filter test',
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
  eval_block: {
    func: args => {
      return `pipe::filter(${args})`
    },
  },
}
_FlowBlocks.prototype.set_state = {
  text: 'Set State',
  type: 'pipe',
  kind: 'normal',
  source: 'original',
  description:
    'Applies the given function and sets the given variable using the result',
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
    {
      text: 'Var',
      name: 'variable',
      description: 'The variable to set',
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
  eval_block: {
    func: ([func, variable]) => {
      return `pipe::set_state(${func}, ${variable})`
    },
  },
}
_FlowBlocks.prototype.stride = {
  text: 'Stride',
  type: 'pipe',
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
      return `pipe::stride(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
  // 'slider' kind block special
  inlineData: [
    {
      name: 'Every Nth',
      description: 'Take every Nth',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.tap = {
  text: 'Tap',
  type: 'pipe',
  kind: 'normal',
  source: 'original',
  description: 'Sends the incoming value to the given function',
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
      description: 'The given function',
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
  eval_block: {
    func: args => {
      return `pipe::tap(${args})`
    },
  },
}
_FlowBlocks.prototype.tee = {
  text: 'Tee',
  type: 'pipe',
  p_type: 'tee',
  kind: 'normal',
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
  outputNodes: [
    {
      text: 'Out',
      name: 'out',
      description: 'The outgoing value',
      type: ['object', 'number'],
    },
    {
      text: 'Brach',
      name: 'out',
      description: 'The outgoing value',
      type: ['object', 'number'],
    },
  ],
  default: [50], // default here is for default inline data instead of input
  eval_block: {
    func: data => {
      return `pipe::tee(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
}
_FlowBlocks.prototype.moving_avg = {
  text: 'Moving Average',
  type: 'pipe',
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
  outputNodes: [
    {
      text: 'Out',
      name: 'out',
      description: 'The outgoing value',
      type: ['object', 'number'],
    },
  ],
  default: ['double', 5], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'mod',
    type: 'function',
    func: ([type, num]) => {
      return `pipe::moving_avg<${type}, ${num}>()`
    },
  },
  inlineData: [
    {
      name: 'Drop',
      description: 'Number of values to drop',
      type: ['object', 'number'],
    },
    {
      name: 'Drop',
      description: 'Number of values to drop',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.pipe_set_var = {
  text: 'Set Var',
  type: 'pipe',
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
  outputNodes: [
    {
      text: 'Out',
      name: 'out',
      description: 'The outgoing value',
      type: ['object', 'number'],
    },
  ],
  default: [undefined], // default here is for default inline data instead of input
  eval_block: {
    func: data => {
      return `pipe::set_var(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
}
_FlowBlocks.prototype.restricted_avg = {
  text: 'Restricted Avg',
  type: 'pipe',
  kind: 'iinput',
  source: 'original',
  description: 'Sets the variable to the incoming value',
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
  inlineData: [
    {
      name: 'tp',
      description: 'Number of values to drop',
      type: ['object', 'number'],
    },
    {
      name: 'span',
      description: 'Number of values to drop',
      type: ['object', 'number'],
    },
    {
      name: 'max diff',
      description: 'Number of values to drop',
      type: ['object', 'number'],
    },
    {
      name: 'max skip',
      description: 'Number of values to drop',
      type: ['object', 'number'],
    },
  ],
  default: ['double', 5, undefined, undefined], // default here is for default inline data instead of input
  eval_block: {
    func: ([tp, to_take, max_diff, skip]) => {
      return `restricted_avg<${tp}, ${to_take}>(${max_diff},${skip})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
}
_FlowBlocks.prototype.pipe_get_var = {
  text: 'Get Var',
  type: 'pipe',
  kind: 'normal',
  source: 'original',
  description: 'Gets the variable, replacing the incoming one',
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
  outputNodes: [
    {
      text: 'Out',
      name: 'out',
      description: 'The outgoing value',
      type: ['object', 'number'],
    },
  ],
  default: [undefined], // default here is for default inline data instead of input
  eval_block: {
    func: data => {
      return `pipe::get_var(${data})`
    },
  },
  run: function (p, o, draw, input, a) {
    o[0] = (valid(a, this.default[0]) * valid(input, 100)) / 100
  },
}
