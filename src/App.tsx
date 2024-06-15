import { useState } from 'react'
import EditorWindow from './components/EditorWindow'
import TestCases from './components/TestCases'
import Options from './components/Options'
import './App.css'

function App() {
  const [fileName, setFileName] = useState("script.cpp");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [url, setUrl] = useState<string>('');

  return (
    <>
      <Options setFileName={setFileName} setTheme={setTheme} />
      <div className="content">
        <EditorWindow fileName={fileName} theme={theme} url={url} />
        <TestCases url={url} setUrl={setUrl} />
      </div>
    </>
  )
}

export default App
