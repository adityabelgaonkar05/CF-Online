import { useState } from 'react'
import EditorWindow from './EditorWindow'
import TestCases from './TestCases'
import Options from './Options'
import '../styles/Screen.scss'

function Screen() {
  const [fileName, setFileName] = useState("script.cpp");
  const [theme, setTheme] = useState<string>("myThemeDark");
  const [url, setUrl] = useState<string>('');
  const [casesPassed, setCasesPassed] = useState<number>(0);
  const [carryOutput, carryOverOutput] = useState<string>('');
  const [clickCompile, setClickCompile] = useState<boolean>(false);

  return (
    <>
    <div className='check-width'><span className='check-width-text'>Use in Landscape mode</span></div>
      <img className='logo-cf' src='/logo-cf-online-ai.png' />
      <Options setFileName={setFileName} setTheme={setTheme} setClickCompile={setClickCompile} />
      <div className="content">
        <EditorWindow 
          fileName={fileName} 
          theme={theme} url={url} 
          setCasesPassed={setCasesPassed} 
          carryOverOutput={carryOverOutput} 
          clickCompile={clickCompile} 
          setClickCompile={setClickCompile}
          />
        <TestCases 
          url={url} 
          setUrl={setUrl} 
          cassesPassed={casesPassed} 
          setCasesPassed={setCasesPassed} 
          carryOutput={carryOutput} 
          />
      </div>
      <footer className="footer">
        Made with ❤️ by <a href="https://github.com/adityabelgaonkar05" target='_blank'>adityabelgaonkar05</a>
      </footer>
    </>
  )
}

export default Screen;
