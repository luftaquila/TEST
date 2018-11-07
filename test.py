import math
x1, y1, x2, y2 = input('두 점의 좌표값을 x1, y1, x2, y2 순서대로 입력 : ').split()
distance = math.sqrt((float(x2) - float(x1)) ** 2 + (float(y2) - float(y1)) ** 2)
print('두 점 사이의 거리는 ' + str(round(distance, 2)) + ' 입니다.')
print('두 점 사이의 거리는 5이하 입니까? ' + str(distance <= 5))
