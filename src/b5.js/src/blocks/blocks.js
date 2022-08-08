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
  run: function (p, o, draw) {}, // This block is ignored by b5
}

export default _FlowBlocks
