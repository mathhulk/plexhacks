import requests 
from bs4 import BeautifulSoup

session = requests.Session()
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        'AppleWebKit/537.36 (KHTML, like Gecko)' 
        'Chrome/83.0.4103.116 Safari/537.36 OPR/69.0.3686.95', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;'
        'q=0.9,image/webp,*/*;q=0.8'}
url = 'https://www.congress.gov/members?q={"congress":"116"}&searchResultViewType=expanded&pageSize=100&page=2'

req = session.get(url, headers=headers)
bs = BeautifulSoup(req.text, 'html.parser')

nameList = bs.findAll('span', {'class':'result-heading'})
for name in nameList:
    print(name.get_text())

