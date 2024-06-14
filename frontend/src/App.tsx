import EditorWindow from './components/EditorWindow'
import { useState } from 'react'
import Options from './components/Options'
import './App.css'

function App() {
  const [fileName, setFileName] = useState("script.cpp");
  const [theme, setTheme] = useState<string>("vs-dark");

  return (
    <>
      <Options setFileName={setFileName} setTheme={setTheme} />
      <EditorWindow fileName={fileName} theme={theme} />
    </>
  )
}

export default App
