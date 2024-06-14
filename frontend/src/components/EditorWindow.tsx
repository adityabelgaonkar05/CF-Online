import { useState } from 'react'
import { Editor } from '@monaco-editor/react'
import '../styles/EditorWindow.scss'

interface File {
    name: string;
    language: string;
    value: string;
}

const files: Record<string, File> =  {
    "script.py": {
        name: "script.py",
        language: "python",
        value: "#Happy coding!",
    },

    "script.cpp": {
        name: "script.cpp",
        language: "cpp",
        value: "//Happy coding!",
    },

    "script.java": {
        name: "script.java",
        language: "java",
        value: "//Happy coding",
    },
}

export default function EditorWindow() {
    const [fileName, setFileName] = useState<string>("script.java");
    const file = files[fileName];
    const theme = "vs-dark";
    return (
        <div className='editor-window'>
            <Editor 
                height="100%" 
                width="75%" 
                theme={theme} 
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
            />
        </div>
    )
}