import { useState } from 'react'
import EditorWindow from './components/EditorWindow'
import TestCases from './components/TestCases'
import Options from './components/Options'
import './App.css'

function App() {
  const [fileName, setFileName] = useState("script.cpp");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [url, setUrl] = useState<string>('');
  const [casesPassed, setCasesPassed] = useState<number>(0);
  const [carryOutput, carryOverOutput] = useState<string>('');

  return (
    <>
      <Options setFileName={setFileName} setTheme={setTheme} />
      <div className="content">
        <EditorWindow fileName={fileName} theme={theme} url={url} setCasesPassed={setCasesPassed} carryOverOutput={carryOverOutput} />
        <TestCases url={url} setUrl={setUrl} cassesPassed={casesPassed} carryOutput={carryOutput} />
      </div>
    </>
  )
}

export default App
