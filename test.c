#define _CRT_SECURE_NO_WARNINGS
#include <Windows.h>
#include <stdio.h>

// 실습3. 문제(1) 폭탄 영향 지역 검출 (type1 or type2)

// 문제일부 지역(15X15:region)이 존재한다고 가정했을 때,
// 이 지역에 투하시킬 폭탄의 위치를 입력 받는다.
// 투하된 폭탄은 폭탄의 종류에 따라 상하좌우로 영향을 미친다.
// A폭탄은 +1, B폭탄은 +2, C폭탄은 +3의 영향력과 파괴력을 갖는다.
// 좌표의 시작은 (0,0)부터 시작

// ex1. A폭탄 - (3,5) 위치에 투하
// (3,5)를 기준으로 외곽에 +1의 두께로 둘러 쌓인 모든 영역에 영향을 미치며, 파괴된 정도는 +1 증가
// (2,4),(2,5),(2,6),(3,4),(3,5),(3,6),(4,4),(4,5),(4,6) 으로 영향을 미치며, 파괴된 정도는 +1 증가

// ex2. B폭탄 - (4,7) 위치에 투하
// (4,7)의 위치를 기준으로 +2 두께의 외곽 지역에 영향을 미침.
// 각 지역이 파괴된 정도는 +2로 올라간다. 이 때, 기존에 파괴되었던 곳은 중첩됨.

// 이와 같은 방식으로 투하된 폭탄을 입력받아 이로부터의 영향력을 확인하고, 영향을 받지 않은 지역을
// 확인한다. (초기 상태는 모두 영향 받지 않은 상태 (파괴정도(배열안의 값):0))

void print_Region(int region[][15]);
void put_Abomb(int region[][15], int Abomb_x, int Abomb_y);
void put_Bbomb(int region[][15], int Bbomb_x, int Bbomb_y);
void put_Cbomb(int region[][15], int Cbomb_x, int Cbomb_y);

int main(void)
{
	int region[15][15] = { 0 };
  for(int i = 0; i < 15; i++) {
    for(int j = 0; j < 15; j++)
      printf("%d ", region[i][j]);
    printf("\n");
  }

	int bomb_x, bomb_y;
	int num = 0;
	char type = 0;

	while (num != 1)
	{
		system("cls");

		print_Region(region);
		printf("=========================================\n\n");
		printf("투하하고 싶은 폭탄의 종류를 선택하세요.(A,B,C) \n");
		printf("종료를 원하시면 F를 입력하세요.\n");
		scanf("%c", &type);

		switch (type)
		{
		case 'A':
			printf("A폭탄을 투하할 위치를 입력해주세요(ex. 3,3)\n");
			scanf("%d, %d", &bomb_x, &bomb_y);

			put_Abomb(region, bomb_x, bomb_y);

			fflush(stdin);
			break;

		case 'B':
			printf("B폭탄을 투하할 위치를 입력해주세요(ex. 3,3)\n");
			scanf("%d, %d", &bomb_x, &bomb_y);

			put_Bbomb(region, bomb_x, bomb_y);

			fflush(stdin);
			break;

		case 'C':
			printf("C폭탄을 투하할 위치를 입력해주세요(ex. 3,3)\n");
			scanf("%d, %d", &bomb_x, &bomb_y);

			put_Cbomb(region, bomb_x, bomb_y);

			fflush(stdin);
			break;

		case 'F':
			printf("프로그램이 종료됩니다\n");
			num = 1;
		}
	}

	return 0;
}

void print_Region(int region[][15])
{
	int i, j;

	for (i = 0; i<15; i++)
	{
		for (j = 0; j<15; j++)
		{
			printf("%d ", *(*(region + i) + j));
		}
		printf("\n");
	}
}

void put_Abomb(int region[][15], int Abomb_x, int Abomb_y)
{
	//Type1
	int xStart, xEnd;
	int yStart, yEnd;
	int itrX, itrY;

	if (Abomb_x < 0 || Abomb_x >= 15 || Abomb_y < 0 || Abomb_y >= 15)
		printf("투하할 수 없는 위치입니다.\n");
	else
	{
		xStart = Abomb_x - 1;
		xEnd = Abomb_x + 1;
		yStart = Abomb_y - 1;
		yEnd = Abomb_y + 1;
		if (xStart < 0) xStart = 0;
		if (yStart < 0) yStart = 0;
		if (xEnd >= 15) xEnd = 14;
		if (yEnd >= 15) yEnd = 14;

		for (itrY = yStart; itrY <= yEnd; itrY++)
			for (itrX = xStart; itrX <= xEnd; itrX++)
				*(*(region + itrX) + itrY) = *(*(region + itrX) + itrY) + 1;
	}
}

void put_Bbomb(int region[][15], int Bbomb_x, int Bbomb_y)
{
	// 문제(1) - 구현1(type1 or type2)
}

void put_Cbomb(int region[][15], int Cbomb_x, int Cbomb_y)
{
	// 문제(1) - 구현2(type1 or type2)
}
