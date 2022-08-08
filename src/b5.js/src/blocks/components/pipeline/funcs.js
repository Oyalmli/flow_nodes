import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.addValue = {
  text: 'Add value',
  type: 'func',
  kind: 'input',
  source: 'original',
  description: 'Adds to incoming value',
  inputNodes: null,
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
    variable_name: args =>
      `addValue${args.map(e => String(e).replace('.', '_'))}`,
    func: args => {
      return `auto addValue${args.map(e =>
        String(e).replace('.', '_')
      )} = [](auto a){ return a + ${args}; }`
    },
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
_FlowBlocks.prototype.even = {
  text: 'Even',
  type: 'func',
  kind: 'inline',
  source: 'original',
  description: 'Function to check if the value is even',
  inputNodes: null,
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
    variable_name: args => `even`,
    func: args => {
      return `auto even = [](auto a){ return (a%2) == 0; }`
    },
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
    variable_name: args => {
      return `negate(${args})`
    },
    func: args => {
      return `auto negate = [](auto g) {\n\t\treturn [=](auto x) { return !g(x); }; \n\t}`
    },
  },
  run: function (p, o, draw, a, b) {
    o[0] = a && b
  },
}
_FlowBlocks.prototype.greaterThan = {
  text: '>',
  type: 'func',
  kind: 'input',
  source: 'original',
  description:
    'Checks if the incoming value is greater than the specified value',
  inputNodes: null,
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
    variable_name: args => `greater_than_${args}`,
    func: args => {
      return `auto greater_than_${args} = [](auto a){ return a > ${args}; }`
    },
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
  kind: 'input',
  source: 'original',
  description:
    'Checks if the incoming value is greater than the specified value',
  inputNodes: null,
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
    variable_name: args => `greater_than_equals_${args}`,
    func: args => {
      return `auto greater_than_equals_${args} = [](auto a){ return a > ${args}; }`
    },
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
  kind: 'input',
  source: 'original',
  description: 'Checks if the incoming value is less than the specified value',
  inputNodes: null,
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
    variable_name: args => `less_than_equals_${args}`,
    func: args => {
      return `auto greater_than_${args} = [](auto a){ return a > ${args}; }`
    },
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
_FlowBlocks.prototype.lessThanEquals = {
  text: '<=',
  type: 'func',
  kind: 'input',
  source: 'original',
  description: 'Checks if the incoming value is less than the specified value',
  inputNodes: null,
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
    variable_name: args => `less_than_equals_${args}`,
    func: args => {
      return `auto less_than_equals_${args} = [](auto a){ return a <= ${args}; }`
    },
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
  kind: 'input',
  source: 'original',
  description:
    'Checks if the incoming value is greater than the specified value',
  inputNodes: null,
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
    variable_name: args => `modulo_${args}`,
    func: args => {
      return `auto modulo_${args} = [](auto a){ return a % ${args}; }`
    },
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
  inputNodes: null,
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
    variable_name: args => `add`,
    func: args => {
      return `auto add = [](auto a, auto b){ return a + b; }`
    },
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
  inputNodes: null,
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
    variable_name: args => `max`,
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
  inputNodes: null,
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
    variable_name: args => `print`,
    func: args => {
      return `auto print = [](auto a){ std::cout << a << "\\n"; }`
    },
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}
