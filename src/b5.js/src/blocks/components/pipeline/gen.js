import _FlowBlocks from '../../main'
import { valid } from '../../method'

_FlowBlocks.prototype.range = {
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
    pipeline_type: 'gen',
    type: 'function',
    func: data => {
      return `gen::range(${data})`
    },
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
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
