import { useState } from "react";

export default function TestCases() {
    const [testCases, setTestCases] = useState<Array<[string, string]> | null>(null);
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTestCases = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/test-cases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });
            const data = await response.json();
            setTestCases([[data.input, data.output]]);
        } catch (error) {
            console.error('Error fetching test cases:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="test-cases-container">
            <input
                type="text"
                placeholder="Codeforces Question Link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={fetchTestCases}>Fetch Test Cases</button>
            <div className="test-cases-list">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    testCases?.map((testCase, index) => (
                        <div key={index} className="test-case">
                            <div className="input">
                                <h4>Input</h4>
                                <pre>{testCase[0]}</pre>
                            </div>
                            <div className="output">
                                <h4>Output</h4>
                                <pre>{testCase[1]}</pre>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
