import { Component, createRef, useEffect, useState } from 'react'
import equal from 'react-fast-compare'

import _b5Search from './blockDrawerBase.js'
import * as method from './blockDrawerMethod.js'
import BlockRendererLite from '../blockRenderer/blockRendererLite.js'
import { searchBarWidth } from '../constants.js'
import { _preDescription } from '../hint/hint.js'
import _b5BlocksObject from '../../b5.js/src/blocks/blocksObjectWrapper.js'
import '../../postcss/components/blockSearch/blockSearch.css'
import BlockPreview from '../blockPreview/blockPreview.js'

const _truncateDescription = d => {
  if (d.length < 65) return d
  let d_arr = d.split(' ')
  let returner = ''
  let i = 0
  while (returner.length < 65) {
    returner += d_arr[i] + ' '
    i++
  }
  if (returner.slice(-2) === '. ') returner = returner.slice(0, -2) + ' '
  return returner + '...'
}

const BlockDrawer = ({ props }) => {
  useEffect(() => {
    const blockData = {
      ..._b5BlocksObject.original,
      ..._b5BlocksObject.custom,
      ..._b5BlocksObject.library,
    } // Merge all available blocks
    let res = {
      func: {},
      gen: {},
      mod: {},
      pipe: {},
      redirect: {},
      sink: {},
      variable: {},
      comment: {},
      function: {},
      dummy: {},
    }
    let idx = 0
    for (const [name, blockD] of Object.entries(blockData)) {
      if (!blockD.text) continue
      res[blockD.type][name] = {
        item: { ...blockD, name: name },
        refIndex: idx++,
      }
    }
    setState(oldState => ({ ...oldState, categories: res }))
  }, [_b5BlocksObject])

  const [state, setState] = useState({
    result: [],
    categories: null,
    focus: null,
  })

  const handleAddBlock = name => {
    if (name) {
      const {
        breakSearch,
        collect,
        codeCanvasSource,
        codeCanvasIndex,
        roomY,
        roomX,
      } = this.props
      collect(
        [name, roomY.toString(), roomX.toString()],
        'addBlock',
        codeCanvasSource,
        codeCanvasIndex
      )
      breakSearch()
    }
  }
  return (
    <div className="blockSearchHolder">
      <div
        className="blockSearch"
        style={{ height: '30vh', minHeight: '200px', overflowY: 'scroll' }}
      >
        {state.categories &&
          Object.entries(state.categories).map(([categoryName, blocks]) => {
            if (Object.keys(blocks).length === 0) return null
            return (
              <BlockList
                key={categoryName}
                blocks={Object.values(blocks).sort((a, b) =>
                  a.item.text.localeCompare(b.item.text)
                )}
                focus={state.focus}
              />
            )
          })}
      </div>
    </div>
  )
}

const BlockList = ({ blocks, focus }) => {
  const listRef = createRef()
  const focusRef = createRef()

  useEffect(() => {
    // Scroll to the focused
    const fc = focusRef.current
    if (fc) {
      if (
        fc.offsetLeft + fc.offsetWidth >
        searchBarWidth + listRef.current.scrollLeft
      )
        // Scroll FORWARD
        listRef.current.scrollLeft =
          fc.offsetLeft + fc.offsetWidth - searchBarWidth + 34
      else if (fc.offsetLeft < listRef.current.scrollLeft)
        // Scroll BACKWARD
        listRef.current.scrollLeft = fc.offsetLeft - 34
    }
  }, [listRef, focusRef])

  return (
    <div className="blockList" ref={listRef}>
      {blocks.map((b, i) => {
        return (
          <div
            key={'blockListBlock ' + b.item.name + i}
            className="searchBlockWrapper"
          >
            <div className="wrapper">
              <BlockRendererLite
                name={b.item.name}
                source={b.item.source}
                focus={i === focus}
                isRenaming={false}
                ref={{
                  block: i === focus ? focusRef : null,
                }}
                draggable={false} // ! Should be enabled
              />
              <div className={'description' + (i === focus ? ' focused' : '')}>
                <div>
                  {_truncateDescription(_preDescription(b.item.description))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BlockDrawer
