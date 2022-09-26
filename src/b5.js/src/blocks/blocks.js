import _FlowBlocks from './main'

//import './components/constant'
//import './components/object'

//import './components/math/arithmetic'
//import './components/math/math'
//import './components/math/logic'

//import './components/draw/draw-basic'
//import './components/draw/draw-style'
//import './components/draw/draw-shape'
//import './components/draw/draw-color'
//import './components/draw/draw-interactive'

//import './components/text'
//import './components/display'
//import './components/interaction'
//import './components/media'
//import './components/moving'

//import './components/library/ml/posenet'
//import './components/library/physical/matter'

import './components/pipeline'

_FlowBlocks.prototype.comment = {
  text: 'note',
  type: 'comment', // ? Should be default?
  kind: 'comment',
  source: 'original',
  description: 'Take a note.',
  inputNodes: null,
  outputNodes: null,
  inlineData: [
    {
      name: 'note',
      description: 'Comment for the code.',
      type: ['object', 'string'],
    },
  ],
  default: [''],
  ignore: true,
}

_FlowBlocks.prototype.dummy = {
  text: 'Dummy',
  type: 'dummy',
  kind: 'iinput',
  source: 'original',
  description: 'Placeholder block',
  inputNodes: [
    {
      text: 'In',
      name: 'in',
      description: 'The incoming value',
      type: ['object', 'string'],
    },
  ],
  outputNodes: [
    {
      text: 'Out',
      name: 'out',
      description: 'Outgoing value',
      type: ['object', 'func'],
    },
  ],
  default: ['...'],
  eval_block: {
    func: ([name]) => `/*TODO::${name}*/`,
  },
  inlineData: [
    {
      name: 'Name',
      description: 'Name of dummy block',
      type: ['object', 'string'],
    },
  ],
}

export default _FlowBlocks
