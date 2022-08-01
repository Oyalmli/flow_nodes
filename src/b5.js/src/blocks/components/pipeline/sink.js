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
      type: ['number'],
    },
  ],
  outputNodes: null,
  default: ['%d\\n'], // default here is for default inline data instead of input
  eval_block: {
    pipeline_type: 'sink',
    type: 'function',
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
