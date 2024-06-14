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

    function handleEditorDidMount(editor: any) {
        editorRef.current = editor;
    }

    async function codeCompile() {
        const editorValue = editorRef.current.getValue();
    
        try {
            const response = await fetch('http://localhost:3000/backendapi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: editorValue }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send editor value to backend');
            }
    
            // Handle success if needed
            console.log('Editor value sent successfully');
        } catch (error) {
            console.error('Error sending editor value to backend:', error);
        }
    }    

    return (
        <div className='editor-window'>
            <button onClick={codeCompile}>Compile</button>
            <Editor 
                height="100%" 
                width="100%" 
                theme={theme} 
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                onMount={handleEditorDidMount}
            />
        </div>
    )
}