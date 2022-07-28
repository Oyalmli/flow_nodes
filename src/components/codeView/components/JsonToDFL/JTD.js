import React from 'react'

const loop = grid => {
  const blocks = grid?.playground?.blocks
  if (!blocks) return
  console.log('SEP')
  for (const [i, row] of Object.entries(blocks)) {
    for (const [j, cell] of Object.entries(row)) {
      console.log(i, j, cell)
    }
  }
}

const JTD = ({ data }) => {
  const { playground, factory } = data

  loop(data)

  return (
    <pre style={{ fontSize: '10px', width: '500px' }}>
      {JSON.stringify(
        playground?.blocks,
        function (a, b) {
          return Object.prototype.toString.call(b) === '[object Array]'
            ? '[' + b.map(v => v) + ']'
            : b
        },
        2
      )}
    </pre>
  )
}

export default JTD
