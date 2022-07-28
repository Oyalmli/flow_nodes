import { useState } from 'react'

import Editor from './components/editor/editor.js'
import Viewer from './components/viewer/viewer.js'
import CodeView from './components/codeView/CodeView.js'
import './postcss/css/main.css'

function App() {
  const [data, setData] = useState({}) // Must be {}

  const bridgeData = data => {
    // Send data from Editor to Viewer
    setData(data)
  }

  //<Viewer data={data} />
  //
  return (
    <>
      <Editor bridge={bridgeData} />
      <CodeView data={data} />
    </>
  )
}

export default App
