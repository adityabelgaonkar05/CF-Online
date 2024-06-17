import { useState } from "react";
import "../styles/TestCases.scss";

export default function TestCases({url, setUrl, cassesPassed, setCasesPassed, carryOutput} : {url: string, setUrl: (url: string) => void, cassesPassed: number, setCasesPassed: (casesPassed: number) => void, carryOutput: string}) {
    const [testCases, setTestCases] = useState<Array<[string, string]> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTestCases = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://cf-online-fetchapi.onrender.com/test-cases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });
            const data = await response.json();
            setTestCases([[data.input, data.output]]);
            setCasesPassed(3);
        } catch (error) {
            console.error('Error fetching test cases:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="test-cases-container">
            <div className="input-box">
                <input
                    type="text"
                    placeholder="CF Question URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button onClick={fetchTestCases}>Fetch!</button>
            </div>
            <div className="test-cases-list">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : testCases ? (
                    testCases?.map((testCase, index) => (
                        <div key={index} className="test-case">
                            <div className="input">
                                <h4>Input</h4>
                                <pre>{testCase[0]}</pre>
                            </div>
                            { cassesPassed === 1 ? (
                                <>
                                <div className="passed-test-case"><h4>All Test Cases Passed</h4><img src='/tickicon.png' alt="Passed" height={20} /></div>
                                </>
                            ) : cassesPassed === 2 ? (
                                <div className="output">
                                    <h4>Output</h4>
                                    <pre>
                                        <img src="/loadinggif.gif" alt="Loading" height={20} />
                                    </pre>
                                </div>
                            ) : cassesPassed === 3 ? (
                                <div className="run-to-see-output">
                                    <h4>Run to see output</h4>
                                </div>
                            ) : (
                                <div className="output">
                                    <div className="failed-test-case"><h4>Output</h4><img src="/crossicon.png" alt="Failed" height={20} /></div>
                                    <pre>
                                        <span>{carryOutput}</span>
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
                ) : 
                <div className="no-test-cases">No test cases to display</div>
                }
            </div>
        </div>
    );
}
