import requests
from bs4 import BeautifulSoup
import json

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

def main():
    url = 'https://codeforces.com/problemset/problem/1985/A'
    test_cases = get_test_cases(url)
    print(json.dumps(test_cases, indent=4))

if __name__ == "__main__":
    main()
