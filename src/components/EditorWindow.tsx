import { useRef, useState } from 'react';
import { Editor, loader } from '@monaco-editor/react';
import axios from 'axios';
import '../styles/EditorWindow.scss';
import { postRequest } from '../utilities/generalServices';

loader.init().then((monaco) => {
    monaco.editor.defineTheme('myTheme', {
        base: 'vs', // Use 'vs' for a light theme base, or 'vs-dark' for dark
        inherit: true, // Inherit rules from the base theme
        rules: [
            { token: '', foreground: 'D4D4D4' }, // Default text color
            { token: 'comment', foreground: '6A9955', fontStyle: 'italic' }, // Comments in green and italic
            { token: 'keyword', foreground: '569CD6' }, // Keywords in blue
            { token: 'string', foreground: 'CE9178' }, // Strings in brownish color
            { token: 'number', foreground: 'B5CEA8' }, // Numbers in light green
            { token: 'type', foreground: '4EC9B0' }, // Types in teal
            { token: 'variable', foreground: '9CDCFE' }, // Variables in light blue
            { token: 'function', foreground: 'DCDCAA' }, // Functions in yellow
            { token: 'identifier', foreground: '9CDCFE' }, // Identifiers in light blue
            { token: 'operator', foreground: 'C586C0' }, // Operators in pink
            { token: 'delimiter', foreground: 'C586C0' }, // Delimiters in pink
            { token: 'delimiter.bracket', foreground: 'D4D4D4' }, // Brackets in default text color
            { token: 'delimiter.parenthesis', foreground: 'D4D4D4' }, // Parentheses in default text color
            { token: 'delimiter.square', foreground: 'D4D4D4' }, // Square brackets in default text color
            { token: 'delimiter.curly', foreground: 'D4D4D4' }, // Curly brackets in default text color
            { token: 'tag', foreground: '569CD6' }, // Tags in blue
            { token: 'attribute.name', foreground: '9CDCFE' }, // Attribute names in light blue
            // Add more rules as needed for other tokens
        ],
        colors: {
            'editor.background': '#072432', // Background color
            'editor.foreground': '#D4D4D4', // Default text color
            'editorCursor.foreground': '#FFCC00', // Cursor color in yellow
            'editorLineNumber.foreground': '#858585', // Line numbers in gray
            'editorLineNumber.activeForeground': '#FFFFFF', // Active line number in white
            'editor.selectionBackground': '#264F78', // Selection background
            'editor.inactiveSelectionBackground': '#3A3D41', // Inactive selection background
            'editorIndentGuide.background': '#404040', // Indent guide in dark gray
            'editorIndentGuide.activeBackground': '#707070', // Active indent guide in light gray
            'editorLineHighlightBackground': '#333333', // Current line highlight background
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
                height="85vh" 
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
