#include <stdio.h>

int main()
{
    int N, i, j;
    int row, col;
    int plate[10][10] = {0};
    int count;

    FILE*fp = fopen("index.txt", "r");
    fscanf(fp, "%d", &N);

    for (i = 0; i < N; i++)
    {
        fscanf(fp, "%d%d", &row, &col);
        plate[row][col] = -1;
        printf("%d %d\n", row, col);
    }
    fclose(fp);

    printf("\n");
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) { printf("[%2d]", plate[i][j]); }
        printf("\n");
    }
    printf("\n");

    for (i = 0; i < 10; i++)
    {
        for (j = 0; j < 10; j++)
        {
            if (plate[i][j] != -1)
            {
                count = 0;
                if (i > 0 && i < 9)
                {
                    if (j > 0 && j < 9)
                    {
                        if (plate[i - 1][j - 1] == -1)  count++;
                        if (plate[i - 1][j] == -1)      count++;
                        if (plate[i - 1][j + 1] == -1)  count++;
                        if (plate[i][j - 1] == -1)      count++;
                        if (plate[i][j + 1] == -1)      count++;
                        if (plate[i + 1][j - 1] == -1)  count++;
                        if (plate[i + 1][j] == -1)      count++;
                        if (plate[i + 1][j + 1] == -1)  count++;
                    }
                    else if (j == 0)
                    {
                        if (plate[i - 1][j] == -1)      count++;
                        if (plate[i - 1][j + 1] == -1)  count++;
                        if (plate[i][j + 1] == -1)      count++;
                        if (plate[i + 1][j] == -1)      count++;
                        if (plate[i + 1][j + 1] == -1)  count++;
                    }
                    else
                    {
                        if (plate[i - 1][j - 1] == -1)  count++;
                        if (plate[i - 1][j] == -1)      count++;
                        if (plate[i][j - 1] == -1)      count++;
                        if (plate[i + 1][j - 1] == -1)  count++;
                        if (plate[i + 1][j] == -1)      count++;
                    }
                }
                else if (i == 0)
                {
                    if (j > 0 && j < 9)
                    {
                        if (plate[i][j - 1] == -1)      count++;
                        if (plate[i][j + 1] == -1)      count++;
                        if (plate[i + 1][j-1] == -1)    count++;
                        if (plate[i + 1][j] == -1)      count++;
                        if (plate[i + 1][j + 1] == -1)  count++;
                    }
                    else if (j == 0)
                    {
                        if (plate[i][j + 1] == -1)      count++;
                        if (plate[i + 1][j] == -1)      count++;
                        if (plate[i + 1][j + 1] == -1)  count++;
                    }
                    else
                    {
                        if (plate[i][j - 1] == -1)      count++;
                        if (plate[i + 1][j - 1] == -1)  count++;
                        if (plate[i + 1][j] == -1)      count++;
                    }
                }
                else
                {
                    if (j > 0 && j < 9)
                    {
                        if (plate[i - 1][j - 1] == -1)  count++;
                        if (plate[i - 1][j] == -1)      count++;
                        if (plate[i - 1][j + 1] == -1)  count++;
                        if (plate[i][j - 1] == -1)      count++;
                        if (plate[i][j + 1] == -1)      count++;
                    }
                    else if (j == 0)
                    {
                        if (plate[i - 1][j] == -1)      count++;
                        if (plate[i - 1][j + 1] == -1)  count++;
                        if (plate[i][j + 1] == -1)      count++;
                    }
                    else
                    {
                        if (plate[i - 1][j - 1] == -1)  count++;
                        if (plate[i - 1][j] == -1)      count++;
                        if (plate[i][j - 1] == -1)      count++;
                    }
                }
                plate[i][j] = count;
            }
        }
    }

    for (i = 0; i < 10; i++)
    {
        for (j = 0; j < 10; j++)
        {
            printf("[%2d]", plate[i][j]);
        }
        printf("\n");
    }
    return 0;
}
