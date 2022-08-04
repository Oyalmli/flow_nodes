onsket = {
  functions: { even, addValue },
  nodes: [
    take(50, range(0, 10, 0)),
    partition(even, [printf], [transform(addValue), printf]),
  ],
}

onsket = {
  functions: { even, addValue },
  nodes: [range(0, 10, 0), transform, transform, printf],
}`pipe::partition(f${v_y_x},${v_y_x.slice(4)}, ${v_y_x.slice(4)})`
