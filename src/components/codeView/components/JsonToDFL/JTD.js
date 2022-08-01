import React, { useEffect, useState } from 'react'
import { CopyBlock, atomOneLight } from 'react-code-blocks'
import _b5BlocksObject from '../../../../b5.js/src/blocks/blocksObjectWrapper.js'

const all = arr => {
  return arr.every(input => Object.values(input).some(e => Boolean(e)))
}

//returns true if the object has input or outpur agruments. For filtering
const has_args = obj => {
  try {
    const { input, output } = obj
    if (!Boolean(input) && !Boolean(output)) return false
    if (all(input) || all(output)) return false
    return true
  } catch {
    return false
  }
  return true
}

const zip = (a, b) =>
  Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]])

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

const connected_components = (nodes, blocks) => {
  let visited = new DefaultDict(false)
  let ccs = []
  for (const node of nodes) {
    if (visited[node.uuid] === false) {
      let temp = []
      ccs.push(dfs(temp, node, visited, blocks))
    }
  }
  return ccs
}

const idx_to_block = ([y, x], blocks) => {
  return blocks?.[y]?.[x]
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

const eval_blocks = (order, blocks) => {
  let result = {
    variables: [],
    functions: [],
    blocks: [],
  }
  const get_data = block => {
    return block.inlineData ?? [0]
  }
  const get_type = type => {
    return {
      constant: 'functions',
      function: 'blocks',
    }[type]
  }
  console.log('blocks', blocks)
  console.log(order)
  for (let block of order) {
    const { type = '', func = '' } = blocks[block.name]?.eval_block
    const data = get_data(block)

    result[get_type(type)].push(func(data))
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
      ok &= outputArr[0]?.length > 0
    }
    if (!ok) return false
  }

  return true
}

const loop = grid => {
  const blocks = grid?.playground?.blocks
  if (!blocks) return

  let nodes = []
  for (let [i, row] of Object.entries(blocks)) {
    for (let [j, cell] of Object.entries(row)) {
      if (cell) {
        nodes.push({ ...cell, row: i, col: j })
      }
    }
  }

  const ccs = connected_components(nodes, blocks)

  const bs = {
    ..._b5BlocksObject.original,
    ..._b5BlocksObject.custom,
    ..._b5BlocksObject.library,
  } // Merge all available blocks
  let res = []
  for (let cc of ccs) {
    all_populated(cc) && res.push(eval_blocks(cc, bs))
  }
  return res
}

const to_str = (arr, sep = '\n') => {
  let str = arr.join(sep)
  if (str) str += ';\n'
  return str
}

const create_view = view => {
  if (!view) return ''
  let res = 'using namespace dfl; \nint main() {\n'
  for (const { blocks, functions, variables } of view) {
    res += to_str(variables, '\n;')
    res += to_str(functions, '\n;')
    res += to_str(blocks, '\n>>= ')
    res += '\n'
  }
  res = res.slice(0, -1)
  res += '}'
  return res
}

const JTD = ({ data }) => {
  const [playground_view, set_playground_view] = useState('')

  useEffect(() => {
    set_playground_view(create_view(loop(data)))
  }, [data])

  return (
    <CopyBlock
      showLineNumbers={false}
      text={playground_view}
      language={'cpp'}
      theme={atomOneLight}
      codeBlock
    />
  )
}

export default JTD
