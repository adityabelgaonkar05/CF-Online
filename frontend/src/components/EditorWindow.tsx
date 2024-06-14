import { useState } from 'react'
import { Editor } from '@monaco-editor/react'

export default function EditorWindow() {
    const [theme, setTheme] = useState("vs-dark");

    return(
        <Editor 
        height="100vh" width="50%" theme={theme} defaultLanguage="cpp"
      />
    )
}