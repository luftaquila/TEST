f = open('data.txt', mode='r', encoding='utf-8-sig')
datum, indexError, mathError = [], [], []
while 1:
    line = f.readline().split()
    if line == []: break
    datum.append(list(map(int, line)))

for i in range(0, len(datum) - 1):
    if datum[i][0] + 1 != datum[i + 1][0]:
        indexError.append(datum[i][0] + 1)

    if datum[i][1] + datum[i][2] + datum[i][3] != datum[i][4]:
        mathError.append(datum[i][0])

print("Missing Index :", indexError)
print("Wrong Calculation Index :", mathError)
f.close()
