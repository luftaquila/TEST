name = input('이름 : ')
num = input('문제 개수 : ')
cor = 0
cnt = 1
print('***************')
while cnt < 6:
    if input(str(cnt) + '번 문제를 해결했나요? (y/n)') == 'y':
        cor = cor + 1
    cnt = cnt + 1
print('***************')
print(name + ' 학생, 총 ' + str(cor) + ' 문제를 해결했습니다.')
