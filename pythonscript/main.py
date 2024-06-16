from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

def get_test_cases(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    input_section = soup.find('div', {'class': 'input'})
    output_section = soup.find('div', {'class': 'output'})
    
    if not input_section or not output_section:
        return {"error": "Test cases not found"}
    
    input_data = input_section.pre.get_text('\n')
    output_data = output_section.pre.get_text()
    
    return {
        "input": input_data.strip(),
        "output": output_data.strip()
    }

@app.route('/test-cases', methods=['POST'])
def test_cases():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400
    test_cases = get_test_cases(url)
    return jsonify(test_cases)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
