import { useState } from 'react'
import EditorWindow from './EditorWindow'
import TestCases from './TestCases'
import Options from './Options'
import '../styles/Screen.scss'

function App() {
  const [fileName, setFileName] = useState("script.cpp");
  const [theme, setTheme] = useState<string>("myThemeDark");
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
