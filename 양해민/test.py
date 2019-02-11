with open('C:\\Users\\LUFT-AQUILA\\Documents\\Atom\\Test\\양해민\\route20181203.txt', encoding='utf-8-sig') as f:
    d = f.read()
d2 = d.split('^')
for k in d2:
    d3 = k.split('|')
    print(d3)
    
