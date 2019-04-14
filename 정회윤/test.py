import random
while 1:
  num = int(input('숫자를 입력하세요 : '))
  if num > 1:
    break
  print('다시 입력해주세요.')
a = random.randint(1, num)
print('1부터 ', num, '까지에서 무작위로 선택된 값은 ', a, '입니다.')
