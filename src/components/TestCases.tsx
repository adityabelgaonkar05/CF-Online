import { useState } from "react";
import "../styles/TestCases.scss";

export default function TestCases({url, setUrl, cassesPassed, carryOutput} : {url: string, setUrl: (url: string) => void, cassesPassed: number, carryOutput: string}) {
    const [testCases, setTestCases] = useState<Array<[string, string]> | null>(null);
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
                            { cassesPassed === 1 ? (
                                <img src='/tickicon.png' alt="Passed" height={80} />
                            ) : cassesPassed === 2 ? (
                                <div className="output">
                                    <h4>Output</h4>
                                    <pre>
                                        <img src="/loadinggif.gif" alt="Loading" height={80} />
                                    </pre>
                                </div>
                            ) : (
                                <div className="output">
                                    <h4>Output</h4>
                                    <pre>
                                        <span>{carryOutput}</span>
                                        <img src="/crossicon.png" alt="Failed" height={40} />
                                    </pre>
                                </div>
                            ) }
                            <div className="output">
                                <h4>Expected Output</h4>
                                <pre>
                                    {testCase[1]}
                                </pre>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
