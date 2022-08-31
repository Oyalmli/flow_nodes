import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.addValue = {
  text: 'Add value',
  type: 'func',
  kind: 'iinput',
  source: 'original',
  description: 'Adds to incoming value',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0],
  eval_block: {
    pipeline_type: 'funcs',
    type: 'function',
    name: 'addValue',
    variable_name: ([val, f]) => {
      if (!Boolean(f) || f.length === 0) return `_addValue(${val})`
      return `_addValue_(${val})(${f})`
    },
    func: () => '',
  },
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
_FlowBlocks.prototype.subValue = {
  text: 'Sub Value',
  type: 'func',
  kind: 'normal',
  source: 'original',
  description: 'Checks if the incoming value is less than the variable',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
    {
      text: 'Var',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0, undefined],
  eval_block: {
    variable_name: ([val, f]) => {
      if (!Boolean(f) || f.length === 0) return `_subValue(${val})`
      return `_subValue_(${val})(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}
_FlowBlocks.prototype.even = {
  text: 'Even',
  type: 'func',
  kind: 'inline',
  source: 'original',
  description: 'Function to check if the value is even',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'Even?',
      name: 'even',
      description: 'Is the value even',
      type: ['object', 'boolean'],
    },
  ],
  default: [true],
  eval_block: {
    pipeline_type: 'funcs',
    type: 'function',
    name: 'even',
    variable_name: ([f]) => {
      if (!Boolean(f) || f.length === 0) return `_even`
      return `_even_(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a, b) {
    o[0] = a && b
  },
}
_FlowBlocks.prototype.negate = {
  text: 'Negate',
  type: 'func',
  kind: 'inline',
  source: 'original',
  description: 'Negate the previous function',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'Not',
      name: 'not',
      description: 'Negate',
      type: ['object', 'boolean'],
    },
  ],
  default: [undefined],
  eval_block: {
    pipeline_type: 'funcs',
    type: 'function',
    name: 'not',
    variable_name: ([f]) => {
      if (!Boolean(f) || f.length === 0) return `_negate`
      return `_negate_(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a, b) {
    o[0] = a && b
  },
}
_FlowBlocks.prototype.not = {
  text: 'Not',
  type: 'func',
  kind: 'inline',
  source: 'original',
  description: 'Negate the previous function',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'Not',
      name: 'not',
      description: 'Negate',
      type: ['object', 'boolean'],
    },
  ],
  default: [undefined],
  eval_block: {
    pipeline_type: 'funcs',
    type: 'function',
    name: 'not',
    variable_name: ([f]) => {
      if (!Boolean(f) || f.length === 0) return `_not_`
      return `_not__(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a, b) {
    o[0] = a && b
  },
}
_FlowBlocks.prototype.between = {
  text: '><',
  type: 'func',
  kind: 'iinput',
  source: 'original',
  description: 'Checks if the incoming value is between the specified values',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0, 10],
  eval_block: {
    variable_name: ([min, max, f]) => {
      if (!Boolean(f) || f.length === 0) return `_between(${min}, ${max})`
      return `_between_(${min}, ${max})(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'min',
      description: 'The target value',
      type: ['object', 'number'],
    },
    {
      name: 'max',
      description: 'The target value',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.outside = {
  text: '<>',
  type: 'func',
  kind: 'iinput',
  source: 'original',
  description: 'Checks if the incoming value is outside the specified values',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0, 10],
  eval_block: {
    variable_name: ([min, max, f]) => {
      if (!Boolean(f) || f.length === 0) return `_outside(${min}, ${max})`
      return `_outside_(${min}, ${max})(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'min',
      description: 'The target value',
      type: ['object', 'number'],
    },
    {
      name: 'max',
      description: 'The target value',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.greaterThan = {
  text: '>',
  type: 'func',
  kind: 'normal',
  source: 'original',
  description: 'Checks if the incoming value is less than the variable',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
    {
      text: 'Var',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0, undefined],
  eval_block: {
    variable_name: ([val, f]) => {
      if (!Boolean(f) || f.length === 0) return `_greater_than(${val})`
      return `_greater_than_(${val})(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}
_FlowBlocks.prototype.greaterThanIL = {
  text: '>',
  type: 'func',
  kind: 'iinput',
  source: 'original',
  description:
    'Checks if the incoming value is greater than the specified value',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0],
  eval_block: {
    variable_name: ([val, f]) => {
      if (!Boolean(f) || f.length === 0) return `_greater_than(${val})`
      return `_greater_than_(${val})(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'target',
      description: 'The target value',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.greaterThanEquals = {
  text: '>=',
  type: 'func',
  kind: 'iinput',
  source: 'original',
  description:
    'Checks if the incoming value is greater than the specified value',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0],
  eval_block: {
    variable_name: ([val, f]) => {
      if (!Boolean(f) || f.length === 0) return `_greater_than_equal(${val})`
      return `_greater_than_equal_(${val})(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'target',
      description: 'The target value',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.lessThan = {
  text: '<',
  type: 'func',
  kind: 'normal',
  source: 'original',
  description: 'Checks if the incoming value is less than the variable',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
    {
      text: 'Var',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0, undefined],
  eval_block: {
    variable_name: ([val, f]) => {
      if (!Boolean(f) || f.length === 0) return `_less_than(${val})`
      return `_less_than_(${val})(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}
_FlowBlocks.prototype.lessThanEquals = {
  text: '<=',
  type: 'func',
  kind: 'iinput',
  source: 'original',
  description: 'Checks if the incoming value is less than the specified value',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0],
  eval_block: {
    variable_name: ([val, f]) => {
      if (!Boolean(f) || f.length === 0) return `_less_than_equal(${val})`
      return `_less_than_equal_(${val})(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'target',
      description: 'The target value',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.mod = {
  text: 'Mod',
  type: 'func',
  kind: 'iinput',
  source: 'original',
  description:
    'Checks if the incoming value is greater than the specified value',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [1],
  eval_block: {
    variable_name: ([val, f]) => {
      if (!Boolean(f) || f.length === 0) return `_mod(${val})`
      return `_mod_(${val})(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'Modulo',
      description: 'Modulo',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.add = {
  text: 'Add',
  type: 'func',
  kind: 'inline',
  source: 'original',
  description: 'Adds two numbers',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0],
  eval_block: {
    variable_name: ([f]) => {
      if (!Boolean(f) || f.length === 0) return `_add`
      return `_add_(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}
_FlowBlocks.prototype.max = {
  text: 'Max',
  type: 'func',
  kind: 'inline',
  source: 'original',
  description: 'Returns the max of two numbers',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0],
  eval_block: {
    variable_name: args => `_max`,
    func: args => {
      return `auto max = [](auto a, auto b){ return a > b ? a : b; }`
    },
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}
_FlowBlocks.prototype.print_func = {
  text: 'Print',
  type: 'func',
  kind: 'inline',
  source: 'original',
  description: 'Returns the max of two numbers',
  inputNodes: [
    {
      text: 'Func',
      name: 'func',
      description: 'The incoming value',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'func'],
    },
  ],
  default: [0],
  eval_block: {
    variable_name: ([f]) => {
      if (!Boolean(f) || f.length === 0) return `_print`
      return `_print_(${f})`
    },
    func: () => '',
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}
_FlowBlocks.prototype.plug = {
  text: 'End',
  type: 'func',
  kind: 'inline',
  source: 'original',
  description: 'Returns the value',
  inputNodes: null,
  outputNodes: [
    {
      text: 'Not',
      name: 'not',
      description: 'Negate',
      type: ['object', 'boolean'],
    },
  ],
  default: [undefined],
  eval_block: {
    pipeline_type: 'funcs',
    type: 'function',
    name: 'not',
    variable_name: args => {
      return ``
    },
    func: args => {
      return ``
    },
  },
  run: function (p, o, draw, a, b) {
    o[0] = a && b
  },
}
