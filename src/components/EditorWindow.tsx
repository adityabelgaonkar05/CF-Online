import { useRef, useState } from 'react';
import { Editor, loader } from '@monaco-editor/react';
import axios from 'axios';
import '../styles/EditorWindow.scss';
import { postRequest } from '../utilities/generalServices';

loader.init().then((monaco) => {
    monaco.editor.defineTheme('myThemeDark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', foreground: 'E8E8E8', fontStyle: 'bold' },
            { token: 'comment', foreground: '87A96B', fontStyle: 'italic bold' },
            { token: 'keyword', foreground: '80BFFF', fontStyle: 'bold' },
            { token: 'string', foreground: 'F0A988', fontStyle: 'bold' },
            { token: 'number', foreground: 'C8F0B0', fontStyle: 'bold' },
            { token: 'type', foreground: '76E3D0', fontStyle: 'bold' },
            { token: 'variable', foreground: 'A9E8FF', fontStyle: 'bold' },
            { token: 'function', foreground: 'FFEAA3', fontStyle: 'bold' },
            { token: 'identifier', foreground: 'A9E8FF', fontStyle: 'bold' },
            { token: 'operator', foreground: 'DDA0DD', fontStyle: 'bold' },
            { token: 'delimiter', foreground: 'DDA0DD', fontStyle: 'bold' },
            { token: 'delimiter.bracket', foreground: 'E8E8E8', fontStyle: 'bold' },
            { token: 'delimiter.parenthesis', foreground: 'E8E8E8', fontStyle: 'bold' },
            { token: 'delimiter.square', foreground: 'E8E8E8', fontStyle: 'bold' },
            { token: 'delimiter.curly', foreground: 'E8E8E8', fontStyle: 'bold' },
            { token: 'tag', foreground: '80BFFF', fontStyle: 'bold' },
            { token: 'attribute.name', foreground: 'A9E8FF', fontStyle: 'bold' },
        ],
        colors: {
            'editor.background': '#072432',
            'editor.foreground': '#E8E8E8',
            'editorCursor.foreground': '#FFCC00',
            'editorLineNumber.foreground': '#858585',
            'editorLineNumber.activeForeground': '#FFFFFF',
            'editor.selectionBackground': '#264F78',
            'editor.inactiveSelectionBackground': '#3A3D41',
            'editorIndentGuide.background': '#404040',
            'editorIndentGuide.activeBackground': '#707070',
            'editorLineHighlightBackground': '#333333',
        }
    });
});

loader.init().then((monaco) => {
    monaco.editor.defineTheme('myThemeLight', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: '', foreground: '000000', fontStyle: 'bold' },
            { token: 'comment', foreground: '008000', fontStyle: 'italic bold' },
            { token: 'keyword', foreground: '#0A4970', fontStyle: 'bold' },
            { token: 'string', foreground: 'A31515', fontStyle: 'bold' },
            { token: 'number', foreground: '098658', fontStyle: 'bold' },
            { token: 'type', foreground: '267f99', fontStyle: 'bold' },
            { token: 'variable', foreground: '001080', fontStyle: 'bold' },
            { token: 'function', foreground: '795E26', fontStyle: 'bold' },
            { token: 'identifier', foreground: '001080', fontStyle: 'bold' },
            { token: 'operator', foreground: '000000', fontStyle: 'bold' },
            { token: 'delimiter', foreground: '000000', fontStyle: 'bold' },
            { token: 'delimiter.bracket', foreground: '000000', fontStyle: 'bold' },
            { token: 'delimiter.parenthesis', foreground: '000000', fontStyle: 'bold' },
            { token: 'delimiter.square', foreground: '000000', fontStyle: 'bold' },
            { token: 'delimiter.curly', foreground: '000000', fontStyle: 'bold' },
            { token: 'tag', foreground: '800000', fontStyle: 'bold' },
            { token: 'attribute.name', foreground: 'FF0000', fontStyle: 'bold' },
        ],
        colors: {
            'editor.background': '#E1EFF1',
            'editor.foreground': '#000000',
            'editorCursor.foreground': '#000000',
            'editorLineNumber.foreground': '#2B91AF',
            'editorLineNumber.activeForeground': '#007ACC',
            'editor.selectionBackground': '#ADD6FF',
            'editor.inactiveSelectionBackground': '#B4CDE6',
            'editorIndentGuide.background': '#C8C8C8',
            'editorIndentGuide.activeBackground': '#A0A0A0',
            'editorLineHighlightBackground': '#D3D3D3',
        }
    });
});

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
        value: "#Happy coding!"
,
    },
    "script.cpp": {
        name: "script.cpp",
        language: "cpp",
        value: "#include <bits/stdc++.h>\n#define int long long\nusing namespace std;\n\nsigned main() \n{\n    int t; cin >> t;\n    while(t--)\n    {\n         \n    }\n}\n",
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
    setCasesPassed: (casesPassed: number) => void;
    carryOverOutput: (output: string) => void;
}

export default function EditorWindow({ fileName, theme, url, setCasesPassed, carryOverOutput }: EditorWindowProps) {
    const file = files[fileName];
    const editorRef = useRef<any>(null);
    const [output, setOutput] = useState<string>('');
    const [testCases, setTestCases] = useState<TestCase>({ input: '', output: '' });

    async function fetchTestCases(url: string): Promise<TestCase> {
        try {
            const response = await postRequest('/test-cases', { url: url });
            const fetchedTestCases = {
                input: response.data["input"],
                output: response.data["output"]
            };
            setTestCases(fetchedTestCases); // Set the state for later use if needed
            return fetchedTestCases; // Return the test cases for immediate use
        } catch (error) {
            console.error('Error fetching test cases:', error);
            throw error; // Throw an error to handle it in the calling function
        }
    }

    function handleEditorDidMount(editor: any) {
        editorRef.current = editor;
    }

    async function getEditorValue() {
        const code = editorRef.current.getValue();
        const language = file.language;
        setCasesPassed(2);

        try {
            const currentTestCases = await fetchTestCases(url); // Fetch and use the test cases

            const data = new URLSearchParams({
                code,
                language: language === 'python' ? 'py' : language,
                input: currentTestCases.input,
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

            const response = await axios(config);
            const apiOutput = response.data.output.trim();
            console.log(apiOutput);
            carryOverOutput(apiOutput);
            const formattedOutput = apiOutput.replace(/\\n/g, '\n');
            setOutput(formattedOutput);
            console.log('Output from API:', apiOutput);
            console.log(apiOutput === currentTestCases.output ? 'Test case passed' : 'Test case failed');
            if(apiOutput === currentTestCases.output) {
                setCasesPassed(1);
            } else {
                setCasesPassed(0);
            }
        } catch (error) {
            console.error(error);
            setOutput('An error occurred while compiling the code.');
            console.log(testCases);
            console.log(output);
        }
    }
    
    return (
        <div className='editor-window'>
            <button onClick={getEditorValue}>Compile</button>
            <Editor 
                height="83vh" 
                width="75vw" 
                theme={theme} 
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                onMount={handleEditorDidMount}
            />
        </div>
    );
}
