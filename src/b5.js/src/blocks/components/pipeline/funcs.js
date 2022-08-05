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
    variable_name: args => `addValue${args}`,
    func: args => {
      return `auto addValue${args} = [](auto a){ return a + ${args}; }`
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

_FlowBlocks.prototype.to_string = {
  text: 'To String',
  type: 'func',
  kind: 'inline',
  source: 'original',
  description: 'Appl',
  inputNodes: null,
  outputNodes: [
    {
      text: 'value',
      name: 'number',
      description: 'The value from add function.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  eval_block: function () {
    return `[](a){ return a.to_string(); }`
  },
  run: function (p, o, draw, a, b) {
    o[0] = valid(a, 0) + valid(b, 0)
  },
}
