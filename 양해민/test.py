import http.server
from urllib.parse import urlparse, unquote

f = open('phone.txt', 'r', encoding='UTF8')
phone = dict()
while True:
    line = f.readline().replace('\n', '')
    if not line: break
    phone[line.split(',')[0]] = line.split(',')[1]
f.close()

class MyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        query = unquote(parsed_path.query)[5:]
        self.send_response(200)
        self.end_headers()

        isNameFound = False
        for name in phone.keys():
            if name == query:
                isNameFound = True

        if isNameFound:
            self.wfile.write((query + ' : ' + phone.get(query)).encode('euc-kr'))
        else:
            self.wfile.write((query + ' : 등록된 번호가 없습니다.').encode('euc-kr'))

        return None

s = http.server.HTTPServer(('localhost', 5000), MyHandler)
s.serve_forever()
