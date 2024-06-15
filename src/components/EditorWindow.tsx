import { useEffect, useRef, useState } from 'react';
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
    const [data, setData] = useState(null);

    function handleEditorDidMount(editor: any) {
        editorRef.current = editor;
    }

    function getEditorValue() {
        alert(editorRef.current.getValue());
    }

    useEffect(() => {
        fetch('http://localhost:3000/api')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(err => console.log(err));
    });   

    return (
        <div className='editor-window'>
            <button onClick={getEditorValue}>Compile</button>
            <Editor 
                height="95vh" 
                width="75vw" 
                theme={theme} 
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                onMount={handleEditorDidMount}
            />
        </div>
    )
}