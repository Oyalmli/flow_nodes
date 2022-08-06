import _FlowBlocks from '../../main'
import { numberValid, valid } from '../../method'

/*
_FlowBlocks.prototype.string = {
  text: 'String',
  type: 'object',
  kind: 'input',
  source: 'original',
  description: 'Set a short string.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'str',
      name: 'string',
      description: 'A (short) string.',
      type: ['object', 'string'],
    },
  ],
  default: ['%d\\n'],
  eval_block: function (inp) {
    return inp
  },
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The (short) string.',
      type: ['object', 'string'],
    },
  ],
}

_FlowBlocks.prototype.number = {
  text: 'Number',
  type: 'object',
  kind: 'input',
  source: 'original',
  description: 'Number',
  inputNodes: null,
  outputNodes: [
    {
      text: 'str',
      name: 'string',
      description: 'Number',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, draw, a) {
    o[0] = numberValid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The (short) string.',
      type: ['object', 'number'],
    },
  ],
}
*/
