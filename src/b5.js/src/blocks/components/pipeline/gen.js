import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.gen_range = {
  text: 'Range',
  type: 'gen',
  kind: 'input',
  source: 'original',
  description: 'Creates a range from low to high with the given step size',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'number'],
    },
  ],
  default: [0, 1, 1],
  eval_block: {
    func: data => {
      //Look into this // Numbers are converted from float to int
      if (data.some(n => String(n).includes('.'))) {
        return `gen::range(${data.map(n =>
          String(n).includes('.') ? n : n.toFixed(1)
        )})`
      }
      return `gen::range(${data})`
    },
  },
  inlineData: [
    {
      name: 'low',
      description: 'The value of number.',
      type: ['object', 'number'],
    },
    {
      name: 'high',
      description: 'The value of number.',
      type: ['object', 'number'],
    },
    {
      name: 'step',
      description: 'The value of number.',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.gen_in = {
  text: 'In',
  type: 'gen',
  kind: 'inline',
  source: 'original',
  description: 'For use in the function factory (entry point)',
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
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'number'],
    },
  ],
  default: [],
  eval_block: {
    func: () => ``,
  },
}
_FlowBlocks.prototype.gen_counter = {
  text: 'Counter',
  type: 'gen',
  kind: 'inline',
  source: 'original',
  description: 'Counts from 0',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'number'],
    },
  ],
  default: [],
  eval_block: {
    func: () => `gen::counter<uint>()`,
  },
}
_FlowBlocks.prototype.gen_file = {
  text: 'File',
  type: 'gen',
  kind: 'input',
  source: 'original',
  description: 'Creates a range from low to high with the given step size',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'number'],
    },
  ],
  default: ['int64_t', 'stdin'],
  eval_block: {
    func: ([tp, source]) => {
      return `gen::file<${tp}>(${source})`
    },
  },
  inlineData: [
    {
      name: 'type',
      description: 'Return value from the file reader',
      type: ['object', 'string'],
    },
    {
      name: 'source',
      description: 'Souce file',
      type: ['object', 'string'],
    },
  ],
}
_FlowBlocks.prototype.gen_sine = {
  text: 'Sine',
  type: 'gen',
  kind: 'input',
  source: 'original',
  description: 'Creates a sine generator',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The returned value',
      type: ['object', 'number'],
    },
  ],
  default: [0.1, 1.0, 0.0],
  eval_block: {
    func: data => {
      return `gen::sine(${data.map(n =>
        String(n).includes('.') ? n : n.toFixed(1)
      )})`
    },
  },
  inlineData: [
    {
      name: 'resolution',
      description: '0.1 = 10 samples / period',
      type: ['object', 'number'],
    },
    {
      name: 'amplitude',
      description: 'Amplitude of the sine wave',
      type: ['object', 'number'],
    },
    {
      name: 'baseline',
      description: 'Baseline for the wave',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.gen_value = {
  text: 'Value',
  type: 'gen',
  kind: 'input',
  source: 'original',
  description: 'Repeats the given value',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  eval_block: {
    func: data => {
      return `gen::value(${data})`
    },
  },
  inlineData: [
    {
      name: 'val',
      description: 'The value to repeat',
      type: ['object', 'number'],
    },
  ],
}
_FlowBlocks.prototype.gen_dummy = {
  text: 'Dummy',
  type: 'gen',
  kind: 'input',
  source: 'original',
  description: 'Creates a range from low to high with the given step size',
  inputNodes: null,
  outputNodes: [
    {
      text: 'val',
      name: 'number',
      description: 'The new value',
      type: ['object', 'number'],
    },
  ],
  default: ['...'],
  eval_block: {
    func: data => {
      return `gen::/*${data}*/()`
    },
  },
  inlineData: [
    {
      name: '',
      description: 'The value of number.',
      type: ['object', 'string'],
    },
  ],
}
