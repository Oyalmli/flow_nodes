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
  const outArr = Object.values(pblock.output ?? {})
    .flat()
    .sort()
    .map(([row, col]) => grid[row][col])
  return outArr
}

const inp = (grid, pblock) => {
  const inpArr = Object.values(pblock.input ?? {})
    .map(([row, col]) => [row, col])
    .filter(Boolean)
  return inpArr.map(([row, col]) => grid[row][col])
}

const get_args = (grid, pblock) => {
  const args = inp(grid, pblock).slice(1)
  return [...args]
}

/*
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
*/
const indent = indent => {
  return '\t'.repeat(indent)
}

const place = (ind, grid, pblock) => {
  if (!pblock) return {}
  const {
    p_type,
    eval_block = { func: undefined, variable_name: undefined },
    args = [],
  } = pblock
  const { func = undefined, variable_name = undefined } = eval_block
  const sep = indent(ind)
  switch (p_type) {
    case 'gen': {
      const { v, f, t } = place(ind, grid, out(grid, pblock)[0])
      return { v, f, t: [sep + func(args), t].join(`\n${sep}>>= `) }
    }
    case 'pipe': {
      let { v = [], f = [], t } = place(ind, grid, out(grid, pblock)[0])
      let tree = [
        func([
          ...args,
          ...get_args(grid, pblock)
            .map(e => {
              const { f: fd, t: td } = place(ind, grid, e)
              f = [...f, fd].flat()
              //t = [...t, td]
              return td
            })
            .flat(),
        ]),
        ...t,
      ].join(`\n${sep}>>= `)
      return { v, f, t: tree }
    }
    case 'redirect': {
      let { f = [], t = [] } = place(ind, grid, out(grid, pblock)[0])
      let tree = [
        func([
          ...args,
          ...get_args(grid, pblock)
            .map(e => {
              const { f: fd, t: td } = place(ind, grid, e)
              f = [...f, fd].flat()
              t = [...t, td].flat()
              return td
            })
            .flat(),
          ...out(grid, pblock).map(e => {
            const { f: fd, t: td } = place(ind + 1, grid, e)
            f = [...f, fd].flat()
            t = [...t, td].flat()
            return sep + td
          }),
        ]),
      ]
      return { f, t: tree }
    }
    //Fork skal være lik redirect
    case 'fork': {
      let { f = [], t = [] } = place(ind, grid, out(grid, pblock)[0])
      let tree = [
        func(
          out(grid, pblock)
            .map(o => {
              const { f: fd, t: td } = place(ind + 1, grid, o)
              f = [...f, fd].flat()
              t = [...t, td].flat()
              return td
            })
            .map(p => `\n${indent(ind + 1)}` + p)
        ),
      ]
      return { f, t: tree }
    }
    case 'sink':
      let t = []
      return {
        t: [
          func([
            ...args,
            ...get_args(grid, pblock)
              .map(e => {
                const { t: td } = place(ind, grid, e)
                t = [...t, td].flat()
                return td
              })
              .flat(),
          ]),
        ],
      }
    case 'func': {
      const _inp = inp(grid, pblock)
      const { f = [], t = [] } = _inp && place(ind, grid, _inp[0])
      return {
        f: [func([...args, ...t]), ...f],
        t: [variable_name([...args, ...t])],
      }
    }
    case 'variable':
      return { t: [pblock.name] }
    default: {
      console.error('NOT IMPLEMENTED', pblock)
      return []
    }
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

const format_variables = variables => {
  let res = []
  for (const { name, blocks } of Object.values(variables)) {
    const block =
      Object.values(blocks)
        .map(e => Object.values(e))
        .flat()?.[0] ?? 0
    res.push({ name, data: block?.inlineData })
  }
  return res
}

const parse_nodes = grid => {
  const blocks = grid?.playground?.blocks
  const variables = grid?.factory?.variable
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
          p_type: blockData[cell.name]?.p_type ?? cell.type,
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

  let res = {
    variables: new Set(),
    functions: new Set(),
    blocks: [],
  }
  for (let cc of ccs) {
    if (!all_populated(cc)) continue
    const { v = [], f = [], t = [] } = place(1, nodes, cc[0])
    v && v.forEach(e => res.variables.add(e)) //add variables
    f && f.forEach(e => res.functions.add(e)) //add functions
    t && res.blocks.push(t)
  }
  res = {
    variables: [...format_variables(variables)].filter(Boolean),
    functions: [...res.functions].filter(Boolean),
    blocks: [...res.blocks].filter(Boolean),
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

const create_view = parsed_ccs => {
  if (!parsed_ccs) return ''
  let res = '#include "dfl/dfl.hpp"\n\nusing namespace dfl; \nint main() {\n'

  res +=
    parsed_ccs.variables.length > 0
      ? parsed_ccs.variables
          .map(({ name, data }) => `\tauto ${name} = ${data};\n`)
          .join('') + '\n'
      : ''
  res +=
    parsed_ccs.functions.length > 0
      ? parsed_ccs.functions.map(e => `\t${e};\n`).join('') + '\n'
      : ''
  for (const line of parsed_ccs.blocks) {
    res += line + ';\n\n'
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
