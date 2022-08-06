import _FlowBlocks from '../../main'
import { valid } from '../../method'

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

_FlowBlocks.prototype.fork = {
  text: 'Fork',
  type: 'redirect',
  p_type: 'fork',
  kind: 'normal',
  source: 'original',
  description: 'Sends the values to all outputs in order',
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
    func: outs => {
      return `pipe::fork(${outs})`
    },
  },
}
