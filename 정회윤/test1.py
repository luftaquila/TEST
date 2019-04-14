count, total, maximum, minimum = 0, 0, 0, 0
while True:
  num = input('숫자를 입력하세요 : ')
  if num == '입력끝':
    break
  num = int(num)
  if not count:
    minimum = maximum = num
  if num > maximum:
    maximum = num
  elif num < minimum:
    minimum = num
  total += num
  count = count + 1

print('입력받은 숫자들의 합은 ', total)
print('입력받은 숫자들의 평균은', total / count)
print('가장 큰 숫자는 ', maximum)
print('가장 작은 숫자는 ', minimum)
