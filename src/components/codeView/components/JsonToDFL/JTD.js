import React, { useEffect, useState } from 'react'
import { CopyBlock, atomOneLight } from 'react-code-blocks'
import _b5BlocksObject from '../../../../b5.js/src/blocks/blocksObjectWrapper.js'

const zip = (a, b) =>
  Array.from(Array(Math.max(b?.length, a?.length)), (_, i) => [a[i], b[i]])

const io_obj_to_neighbour_arr = obj => {
  const { input = {}, output = {} } = obj
  return [...Object.values(input), ...Object.values(output).flat()].filter(
    Boolean
  )
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

const dfs = (temp, node, visited, nodes) => {
  visited[node.uuid] = true
  temp.push(node)
  const io_arr = io_obj_to_neighbour_arr(node)
  for (let [row, col] of io_arr) {
    if (visited[nodes[row][col].uuid] === false) {
      temp = dfs(temp, nodes[row][col], visited, nodes)
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

const connected_components = nodes => {
  let visited = new DefaultDict(false)
  let ccs = []

  for (const node of iter_nodes(nodes)) {
    if (visited[node.uuid] === false) {
      let temp = []
      ccs.push(dfs(temp, node, visited, nodes))
    }
  }
  return ccs
}

const out = (grid, pblock) => {
  const outArr = Object.values(pblock.output)
    .map(([row, col]) => [row, col])
    .flat()
    .filter(Boolean)
  return outArr.map(([row, col]) => grid[row][col])
}

const inp = (grid, pblock) => {
  const inpArr = Object.values(pblock.input)
    .map(([row, col]) => [row, col])
    .filter(Boolean)
  return inpArr.map(([row, col]) => grid[row][col])
}

const get_args = (grid, pblock) => {
  const args = inp(grid, pblock).slice(1)
  return [...args]
}

const place = (grid, pblock) => {
  const { name, type, eval_block, args = [] } = pblock
  const { func } = eval_block
  let blk = { name, func, data: args }
  switch (type) {
    case 'gen':
      return [blk, ...place(grid, out(grid, pblock)[0])]
    case 'pipe':
      return [
        {
          ...blk,
          data: [
            ...args,
            ...get_args(grid, pblock)
              .map(e => place(grid, e))
              .flat(),
          ],
        },
        ...place(grid, out(grid, pblock)[0]),
      ]
    case 'redirect':
      return [
        {
          ...blk,
          data: [
            ...args,
            ...get_args(grid, pblock)
              .map(e => place(grid, e))
              .flat(),
            ...out(grid, pblock).map(o => place(grid, o)),
          ],
        },
      ]
    case 'sink':
      return [blk]
    case 'func':
      return [blk]
    default:
      console.error('NOT IMPLEMENTED')
      return []
  }
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

  const blockData = {
    ..._b5BlocksObject.original,
    ..._b5BlocksObject.custom,
    ..._b5BlocksObject.library,
  } // Merge all available blocks
  //TODO: populate data in nodes using this

  let nodes = {}
  for (let [i, row] of Object.entries(blocks)) {
    for (let [j, cell] of Object.entries(row)) {
      if (cell) {
        if (!nodes[i]) nodes[i] = {}
        nodes[i][j] = {
          uuid: cell.uuid,
          type: cell.type,
          name: cell.name,
          args: cell.inlineData,
          eval_block: blockData[cell.name]?.eval_block,
          input: cell.input,
          output: cell.output,
        }
      }
    }
  }
  const ccs = connected_components(nodes)
  //TODO: Fix CC

  let res = []
  for (let cc of ccs) {
    all_populated(cc) && res.push(place(nodes, cc[0])) //Need way of finding "top" of CC, not just choosing 0
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

const create_view = parsed_ccs => {
  console.log(parsed_ccs)
  if (!parsed_ccs) return ''
  let indentLevel = 1
  let res = '#include "dfl/dfl.hpp"\n\nusing namespace dfl; \nint main() {\n'
  //res += to_str(merge(view, 'function'), indentLevel, ';\n')
  //res += to_str(merge(view, 'variable'), indentLevel, ';\n')
  //for (const { component } of view) {
  //res += to_str(component, indentLevel, '\n' + indent(indentLevel) + '>>=')
  //res += '\n'
  //}
  res = res.slice(0, -1)
  res += '}'
  return res
}

const JTD = ({ data }) => {
  const [playground_view, set_playground_view] = useState('')

  useEffect(() => {
    console.log('SEP')
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
