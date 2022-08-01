import { Component } from 'react'

import _b5BlocksObject from '../../../b5.js/src/blocks/blocksObjectWrapper.js'
import Node from '../node.js'
import { InputBox } from '../frags.js'
import { getOutputConnectType } from '../blockRendererMethod.js'

export default class InputBlock extends Component {
  render() {
    const {
      action,
      className,
      name,
      text,
      type,
      x,
      y,
      inlineData,
      output,
      input,
      inputNodes,
      outputNodes,
      collect,
      nodesRef,
      focused,
      selectedNodes,
    } = this.props
    return (
      // * string input block is specially long...
      <div
        className={className + (text === 'str' ? ' longInputWidth' : '')}
        data-hints={`${name} block`}
      >
        {inputNodes && (
          <div className="nodes inputNodes">
            <Node
              nodeClass="input"
              count={1}
              type={type}
              connectType={input[0] !== null ? inputNodes[0].type[0] : null}
              ref={nodesRef.input[0]}
              focused={focused}
              selected={selectedNodes.input.includes('0')}
              name={name}
              nodeType={'inputNodes'}
              hintRefPosition={0}
              hintSide={'up'}
              background={true}
            />
          </div>
        )}
        {/* <div className="blockName">{text}</div> */}
        <div style={{ display: 'flex' }}>
          {inlineData &&
            inlineData.map((ild, idx) => (
              <InputBox
                key={idx}
                action={action}
                className={''}
                thisInlineData={ild}
                thisDataType={
                  _b5BlocksObject.original[name].inlineData[idx].type[1]
                }
                inlineDataInd={idx}
                name={name}
                x={x}
                y={y}
                collect={collect}
                hintRefPosition={idx}
              />
            ))}
        </div>
        <p className="nodeText bottomText">{text}</p>
        {output && (
          <div className="nodes outputNodes">
            <Node
              nodeClass="output"
              count={1}
              type={type}
              connectType={getOutputConnectType(output, outputNodes, 0)}
              ref={nodesRef.output[0]}
              focused={focused}
              selected={selectedNodes.output.includes('0')}
              name={name}
              nodeType={'outputNodes'}
              hintRefPosition={0}
              hintSide={'down'}
            />
          </div>
        )}
      </div>
    )
  }
}
