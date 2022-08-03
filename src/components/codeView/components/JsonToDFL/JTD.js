import React, { useEffect, useState } from 'react'
import { CopyBlock, atomOneLight } from 'react-code-blocks'
import _b5BlocksObject from '../../../../b5.js/src/blocks/blocksObjectWrapper.js'

const zip = (a, b) =>
  Array.from(Array(Math.max(b?.length, a?.length)), (_, i) => [a[i], b[i]])

const io_obj_to_neighbour_arr = obj => {
  const { input = {}, output = {} } = obj
  let arr = Object.values(input)
  arr = arr.concat(Object.values(output).flat())
  return arr.filter(e => e)
}

class DefaultDict {
  constructor(defaultVal) {
    return new Proxy(
      {},
      {
        get: (target, name) => (name in target ? target[name] : defaultVal),
      }
    )
  }
}

const dfs = (temp, node, visited, blocks) => {
  visited[node.uuid] = true
  temp.push(node)
  const io_arr = io_obj_to_neighbour_arr(node)
  for (let [y, x] of io_arr) {
    if (visited[blocks[y][x].uuid] === false) {
      temp = dfs(temp, blocks[y][x], visited, blocks)
    }
  }
  return temp
}

const iter_nodes = obj => {
  const res = Object.values(obj)
    .map(o => Object.values(o).flat())
    .flat()
  return res
}

const connected_components = (nodes, blocks) => {
  let visited = new DefaultDict(false)
  let ccs = []

  for (const node of iter_nodes(blocks)) {
    if (visited[node.uuid] === false) {
      let temp = []
      ccs.push(dfs(temp, node, visited, nodes))
    }
  }
  return ccs
}

const traverse = (args, root, nodes, blocks) => {
  let visited = new DefaultDict(false)
  let body = {}
  let stack = [root]
  while (stack.length > 0) {
    const c_node = stack.pop()
    if (!c_node) return
    const io_arr = io_obj_to_neighbour_arr(c_node)
    let args = []
    for (let [y, x] of io_arr) {
      if (visited[blocks[y][x].uuid] === false) {
        args = traverse(args, blocks[y][x], visited, blocks)
      }
    }
  }
  return body
}

const get_block = (arr, row, col) => {
  return arr[row][col]
}

const eval_blocks = (order, nodes, blockData) => {
  let result = {
    variable: [],
    function: [],
    component: [],
  }
  const get_data = block => {
    const { input } = block
    if (input) {
      for (let [row, col] of Object.values(input).slice(1)) {
        const b = get_block(nodes, row, col)
        if (b.type === 'func') {
          return [blockData[b.name]?.eval_block?.variable_name?.(b.inlineData)]
        }
        return get_data(b)
      }
    }
    return block.inlineData
  }
  for (let block of order) {
    const { type = '', func = '' } = blockData[block.name]?.eval_block
    const data = get_data(block)
    result[type].push(func(data))
  }
  return result
}

const all_populated = components => {
  for (const component of components) {
    const { input, output } = component
    let ok = true
    if (input) {
      const inputArr = Object.values(input)
      ok &= inputArr.length > 0 && !inputArr.some?.(e => !e)
    }
    if (output) {
      const outputArr = Object.values(output)
      ok &= outputArr?.every(e => e.length > 0)
    }
    if (!ok) return false
  }
  return true
}

const parse_nodes = grid => {
  const blocks = grid?.playground?.blocks
  if (!blocks) return

  let nodes = {}
  for (let [i, row] of Object.entries(blocks)) {
    for (let [j, cell] of Object.entries(row)) {
      if (cell) {
        if (!nodes[i]) nodes[i] = {}
        nodes[i][j] = { ...cell, row: i, col: j }
      }
    }
  }
  const ccs = connected_components(nodes, blocks)
  const blockData = {
    ..._b5BlocksObject.original,
    ..._b5BlocksObject.custom,
    ..._b5BlocksObject.library,
  } // Merge all available blocks
  let res = []
  for (let cc of ccs) {
    all_populated(cc) && res.push(eval_blocks(cc, nodes, blockData))
  }
  return res
}

const to_str = (arr, indentLevel, sep = '\n') => {
  let str = [...arr.map(s => indent(indentLevel) + s)].join(sep)
  if (str) str += ';\n'
  return str
}

const merge = (arr, key) => {
  let res = new Set(arr.map(sarr => sarr[key]).flat())
  return [...res] ?? []
}

const indent = indent => {
  return '\t'.repeat(indent)
}

const create_view = view => {
  if (!view) return ''
  let indentLevel = 1
  let res = '#include "dfl/dfl.hpp"\n\nusing namespace dfl; \nint main() {\n'
  res += to_str(merge(view, 'function'), indentLevel, ';\n')
  res += to_str(merge(view, 'variable'), indentLevel, ';\n')
  for (const { component } of view) {
    res += to_str(component, indentLevel, '\n' + indent(indentLevel) + '>>=')
    res += '\n'
  }
  res = res.slice(0, -1)
  res += '}'
  return res
}

const JTD = ({ data }) => {
  const [playground_view, set_playground_view] = useState('')

  useEffect(() => {
    set_playground_view(create_view(parse_nodes(data)))
  }, [data])

  return (
    <CopyBlock
      showLineNumbers={false}
      text={playground_view}
      language={'cpp'}
      theme={{ ...atomOneLight, backgroundColor: 'inherit' }}
      codeBlock
    />
  )
}

export default JTD
