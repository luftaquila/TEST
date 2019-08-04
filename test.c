#define _CRT_SECURE_NO_WARNINGS
#include <Windows.h>
#include <stdio.h>

// �ǽ�3. ����(1) ��ź ���� ���� ���� (type1 or type2)

// �����Ϻ� ����(15X15:region)�� �����Ѵٰ� �������� ��,
// �� ������ ���Ͻ�ų ��ź�� ��ġ�� �Է� �޴´�.
// ���ϵ� ��ź�� ��ź�� ������ ���� �����¿�� ������ ��ģ��.
// A��ź�� +1, B��ź�� +2, C��ź�� +3�� ����°� �ı����� ���´�.
// ��ǥ�� ������ (0,0)���� ����

// ex1. A��ź - (3,5) ��ġ�� ����
// (3,5)�� �������� �ܰ��� +1�� �β��� �ѷ� ���� ��� ������ ������ ��ġ��, �ı��� ������ +1 ����
// (2,4),(2,5),(2,6),(3,4),(3,5),(3,6),(4,4),(4,5),(4,6) ���� ������ ��ġ��, �ı��� ������ +1 ����

// ex2. B��ź - (4,7) ��ġ�� ����
// (4,7)�� ��ġ�� �������� +2 �β��� �ܰ� ������ ������ ��ħ.
// �� ������ �ı��� ������ +2�� �ö󰣴�. �� ��, ������ �ı��Ǿ��� ���� ��ø��.

// �̿� ���� ������� ���ϵ� ��ź�� �Է¹޾� �̷κ����� ������� Ȯ���ϰ�, ������ ���� ���� ������
// Ȯ���Ѵ�. (�ʱ� ���´� ��� ���� ���� ���� ���� (�ı�����(�迭���� ��):0))

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
		printf("�����ϰ� ���� ��ź�� ������ �����ϼ���.(A,B,C) \n");
		printf("���Ḧ ���Ͻø� F�� �Է��ϼ���.\n");
		scanf("%c", &type);

		switch (type)
		{
		case 'A':
			printf("A��ź�� ������ ��ġ�� �Է����ּ���(ex. 3,3)\n");
			scanf("%d, %d", &bomb_x, &bomb_y);

			put_Abomb(region, bomb_x, bomb_y);

			fflush(stdin);
			break;

		case 'B':
			printf("B��ź�� ������ ��ġ�� �Է����ּ���(ex. 3,3)\n");
			scanf("%d, %d", &bomb_x, &bomb_y);

			put_Bbomb(region, bomb_x, bomb_y);

			fflush(stdin);
			break;

		case 'C':
			printf("C��ź�� ������ ��ġ�� �Է����ּ���(ex. 3,3)\n");
			scanf("%d, %d", &bomb_x, &bomb_y);

			put_Cbomb(region, bomb_x, bomb_y);

			fflush(stdin);
			break;

		case 'F':
			printf("���α׷��� ����˴ϴ�\n");
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
		printf("������ �� ���� ��ġ�Դϴ�.\n");
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
	// ����(1) - ����1(type1 or type2)
}

void put_Cbomb(int region[][15], int Cbomb_x, int Cbomb_y)
{
	// ����(1) - ����2(type1 or type2)
}
