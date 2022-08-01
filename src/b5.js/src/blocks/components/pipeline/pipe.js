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
    type: 'function',
    func: args => {
      return `pipe::transform(${args.func})`
    },
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
}

_FlowBlocks.prototype.partition = {
  text: 'Partition',
  type: 'pipe',
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
    type: 'function',
    func: args => {
      return `partition(${args.func}, ${args.l}, ${args.r})`
    },
  },
}
