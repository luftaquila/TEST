import requests
import re
from bs4 import BeautifulSoup

def get_html(url):
    _html = ""
    resp = requests.get(url)
    if(resp.status_code == 200):
        _html = resp.text
    return _html

URL = "https://www.vox.com/2018/9/25/17901082/trump-un-2018-speech-full-text"
html = get_html(URL)
soup = BeautifulSoup(html, 'html.parser')
main = str(soup.find('div', {'class' : 'c-entry-content'})).split('\n')
count = 1
for i in main:
    if i[:3] == '<hr':
        break
    count = count + 1
main[:count] = []
main = re.sub('<.+?>', '', '\n'.join(main), 0).strip().lower()
main = re.sub("[0-9\W]", ' ', main)

wordAll = main.split(' ')
wordDic = {}
for i in wordAll:
    wordCnt=wordAll.count(i);
    wordDic[i] = wordCnt

wordList = sorted(wordDic.items(), key  = lambda x: x[1], reverse = True)
del wordList[0]

print(wordList[:20])
