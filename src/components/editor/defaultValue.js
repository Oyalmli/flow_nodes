import { v4 as uuidv4 } from 'uuid'

import {
  lineNumberWidth,
  blockAlphabetHeight,
  factoryCanvasDefaultScale,
  sectionHeightDefault,
} from '../constants.js'

/* ------------------------------ Intro Editor ------------------------------ */

export const introEditor = {
  playground: {
    type: 'playground',
    lineStyles: {},
    blocks: {
      0: {
        1: {
          name: 'range',
          source: 'original',
          uuid: '31a2337e-140f-427a-938b-8ae885b7b7dc',
          inlineData: [0, 30, 1],
          type: 'gen',
          output: {
            0: [],
          },
        },
        2: {
          name: 'addValue',
          source: 'original',
          uuid: '376d1b53-3ea8-4555-9ea1-88f87b6abf32',
          input: {
            0: null,
          },
          inlineData: [1],
          type: 'func',
          output: {
            0: [['1', '1', '1']],
          },
        },
      },
      1: {
        0: {
          name: 'comment',
          source: 'original',
          uuid: 'd9dcb7d0-87bb-412d-9ac9-f5102dc9d2fa',
          inlineData: ['Connect range to transform to complete the graph'],
          type: 'comment',
        },
        1: {
          name: 'transform',
          source: 'original',
          uuid: 'e9c28f68-7dc8-498d-9d1e-96b156a29afc',
          input: {
            0: null,
            1: ['0', '2', '0'],
          },
          type: 'pipe',
          output: {
            0: [['2', '1', '0']],
          },
        },
        2: {
          name: 'mod',
          source: 'original',
          uuid: 'bf97c356-40ed-4f02-8c33-46c8213f3884',
          input: {
            0: null,
          },
          inlineData: [15],
          type: 'func',
          output: {
            0: [['2', '1', '1']],
          },
        },
      },
      2: {
        1: {
          name: 'partition',
          source: 'original',
          uuid: '4f32f94b-e50b-4055-be77-08ad1240e6bc',
          input: {
            0: ['1', '1', '0'],
            1: ['1', '2', '0'],
          },
          type: 'redirect',
          output: {
            0: [['3', '1', '0']],
            1: [['3', '3', '0']],
          },
        },
        2: {
          name: 'mod',
          source: 'original',
          uuid: '4cf89c8d-42c2-42d7-b342-0d6f40073a8c',
          input: {
            0: null,
          },
          inlineData: [5],
          type: 'func',
          output: {
            0: [['3', '1', '1']],
          },
        },
      },
      3: {
        1: {
          name: 'partition',
          source: 'original',
          uuid: '1af2502b-f93a-4252-a86c-529d6048db50',
          input: {
            0: ['2', '1', '0'],
            1: ['2', '2', '0'],
          },
          type: 'redirect',
          output: {
            0: [['4', '1', '0']],
            1: [['4', '3', '0']],
          },
        },
        2: {
          name: 'mod',
          source: 'original',
          uuid: '89676fee-0aef-4b0a-97db-7aba3da44657',
          input: {
            0: null,
          },
          inlineData: [3],
          type: 'func',
          output: {
            0: [['4', '1', '1']],
          },
        },
        3: {
          name: 'printf',
          source: 'original',
          uuid: 'e6597866-7631-41b1-81cd-648183ce6502',
          input: {
            0: ['2', '1', '1'],
          },
          inlineData: ['FizzBuzz\\n'],
          type: 'sink',
        },
      },
      4: {
        1: {
          name: 'partition',
          source: 'original',
          uuid: 'acf61cbd-a961-4f21-a75f-0097adf07c09',
          input: {
            0: ['3', '1', '0'],
            1: ['3', '2', '0'],
          },
          type: 'redirect',
          output: {
            0: [['5', '1', '0']],
            1: [['5', '3', '0']],
          },
        },
        3: {
          name: 'printf',
          source: 'original',
          uuid: 'd29c2e3e-22ed-4beb-8e59-c6516d305440',
          input: {
            0: ['3', '1', '1'],
          },
          inlineData: ['Buzz%d\\n'],
          type: 'sink',
        },
      },
      5: {
        1: {
          name: 'printf',
          source: 'original',
          uuid: '55194c13-9b2c-45ee-9443-672cbd4a8ec9',
          input: {
            0: ['4', '1', '0'],
          },
          inlineData: ['%d\\n'],
          type: 'sink',
        },
        3: {
          name: 'printf',
          source: 'original',
          uuid: '90aa90e1-1dc3-4bd6-930e-eae5fa201478',
          input: {
            0: ['4', '1', '1'],
          },
          inlineData: ['Fizz%d\\n'],
          type: 'sink',
        },
      },
    },
  },
  factory: {
    variable: [],
    function: [],
    object: [],
  },
  version: '0.1.0',
}

export const introEditorCanvasStyle = {
  playground: {
    left: lineNumberWidth,
    top: blockAlphabetHeight,
    scale: 1,
  },
  factory: {
    variable: [
      /* --- canvasStyle --- */
      {
        left: lineNumberWidth,
        top: blockAlphabetHeight,
        scale: factoryCanvasDefaultScale,
        sectionHeight: sectionHeightDefault,
      },
      {
        left: lineNumberWidth,
        top: blockAlphabetHeight,
        scale: factoryCanvasDefaultScale,
        sectionHeight: sectionHeightDefault,
      },
    ],
    function: [],
    object: [],
  },
}

/* ----------------------------- Default Editor ----------------------------- */

export const defaultEditor = {
  playground: {
    type: 'playground',
    lineStyles: {},
    blocks: {
      0: {
        1: {
          name: 'numberSlider',
          source: 'original',
          uuid: uuidv4(),
          inlineData: [70, 0, 100, 5],
          output: { 0: [['1', '1', '1']] },
        },
      },
      1: {
        0: {
          name: 'fillPicker',
          source: 'original',
          uuid: uuidv4(),
          inlineData: ['#bd10e0ff'],
        },
        1: {
          name: 'circle',
          source: 'original',
          uuid: uuidv4(),
          input: { 0: null, 1: ['0', '1', '0'], 2: null },
        },
      },
    },
  },
  factory: {
    variable: [
      {
        name: 'cnv',
        type: 'variable',
        lineStyles: {},
        blocks: {
          0: {
            0: {
              name: 'number',
              source: 'original',
              uuid: uuidv4(),
              inlineData: [500],
              output: { 0: [['1', '0', '0']] },
            },
            1: {
              name: 'numberSlider',
              source: 'original',
              uuid: uuidv4(),
              inlineData: [300, 0, 600, 100],
              output: { 0: [['1', '0', '1']] },
            },
          },
          1: {
            0: {
              name: 'createCanvas',
              source: 'original',
              uuid: uuidv4(),
              input: {
                0: ['0', '0', '0'],
                1: ['0', '1', '0'],
                2: null,
              },
              output: { 0: [] },
            },
          },
        },
      },
    ],
    function: [],
    object: [],
  },
}

export const defaultEditorCanvasStyle = {
  playground: {
    left: lineNumberWidth,
    top: blockAlphabetHeight,
    scale: 1,
  },
  factory: {
    variable: [
      /* --- canvasStyle --- */
      {
        left: lineNumberWidth,
        top: blockAlphabetHeight,
        scale: factoryCanvasDefaultScale,
        sectionHeight: sectionHeightDefault,
      },
    ],
    function: [],
    object: [],
  },
}

// Structure template

// A section template to add to each tab
const nativeSectionData = {
    name: '' /* Modify before adding... */,
    type: '' /* Modify before adding... */,
    /*
     type should always be 'variable', 'function', and 'object'
     (w/out 's'!) in the data object and passed along the functions
     */
    lineStyles: {},
    blocks: {},
  },
  nativeSectionStyle = {
    left: lineNumberWidth,
    top: blockAlphabetHeight,
    scale: factoryCanvasDefaultScale,
    sectionHeight: sectionHeightDefault,
  }
export const nativeSectionDataToAdd = JSON.stringify(nativeSectionData),
  nativeSectionStyleToAdd = JSON.stringify(nativeSectionStyle)
