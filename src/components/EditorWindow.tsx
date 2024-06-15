import { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import '../styles/EditorWindow.scss';
import { postRequest } from '../utilities/generalServices';

interface File {
    name: string;
    language: string;
    value: string;
}

interface TestCase {
    input: string;
    output: string;
}

const files: Record<string, File> = {
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
};

interface EditorWindowProps {
    fileName: string;
    theme: string;
    url: string;
}

export default function EditorWindow({ fileName, theme, url }: EditorWindowProps) {
    const file = files[fileName];
    const editorRef = useRef<any>(null);
    const [output, setOutput] = useState<string>('');
    const [testCases, setTestCases] = useState<TestCase>({ input: '', output: '' });

    // useEffect(() => {
        async function fetchTestCases( url: string) {
            try {
                const response = await postRequest('/test-cases', { url: url });
                setTestCases({"input" : response.data["input"], "output" : response.data["output"]});
            } catch (error) {
                console.error('Error fetching test cases:', error);
            }   

            console.log(testCases);
        }
    // }, []);

    function handleEditorDidMount(editor: any) {
        editorRef.current = editor;
    }

    async function getEditorValue() {
        const code = editorRef.current.getValue();
        const language = file.language;

        fetchTestCases(url)

        if (!testCases) {
            console.error('Test cases not available');
            return;
        }

        const data = new URLSearchParams({
            code,
            language: language === 'python' ? 'py' : language,
            input: testCases.input,
        });

        const config = {
            method: 'post',
            url: 'https://api.codex.jaagrav.in',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data.toString()
        };

        console.log(data.toString());

        try {
            const response = await axios(config);
            const apiOutput = response.data.output.trim();
            console.log(apiOutput);
            const formattedOutput = apiOutput.replace(/\\n/g, '\n');
            setOutput(formattedOutput);
            console.log('Output from API:', apiOutput);
            console.log(apiOutput === testCases.output ? 'Test case passed' : 'Test case failed');
        } catch (error) {
            console.error(error);
            setOutput('An error occurred while compiling the code.');
        }
    }
    
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
            {output && <div className="output">{output}</div>}
        </div>
    );
}
