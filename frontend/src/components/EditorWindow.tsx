import { useRef } from 'react';
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

interface EditorWindowProps {
    fileName: string;
    theme: string;
}


export default function EditorWindow({ fileName, theme }: EditorWindowProps) {
    const file = files[fileName];
    const editorRef = useRef<any>(null);

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    function getEditorValue() {
        alert(editorRef.current.getValue());
    }

    return (
        <div className='editor-window'>
            <button onClick={getEditorValue}>Get Editor Value</button>
            <Editor 
                height="100%" 
                width="75%" 
                theme={theme} 
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                onMount={handleEditorDidMount}
            />
        </div>
    )
}