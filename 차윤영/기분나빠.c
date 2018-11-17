#include <stdio.h>

void print_array (int A[14][14])
{
    for (int i = 0; i < 14; i++)
    {
        for (int j = 0; j < 14; j++)
        {
            printf("[%d]", A[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

void paint_array (int A[14][14], int row, int col, int length)
{
    if (row < 0 || row >= 14 || col < 0 || col >= 14)
        return;

    if (A[row][col] == 0)
    {
        A[row][col] = 1;
    }

    if (A[row][col-1] != 1)
        paint_array(A, row, col-1, length);
    if (A[row-1][col] != 1)
        paint_array(A, row-1, col, length);
    if (A[row+1][col] != 1)
        paint_array(A, row+1, col, length);
    if (A[row][col+1] != 1)
        paint_array(A, row, col+1, length);

}

int main()
{
    FILE*fp1 = fopen("input.txt", "r");
    int i, j;
    int start_r, start_c;
    int A[14][14];

    fscanf(fp1, "%d %d", &start_r, &start_c);

    for (i = 0; i < 14; i++)
    {
        for (j = 0; j < 14; j++)
        {
            fscanf(fp1, "%d", &A[i][j]);
        }
    }
    fclose(fp1);

    printf("===============Empty heart===============\n");
    print_array(A);
    printf("Starting from [%d, %d]\n\n", start_r, start_c);

    paint_array(A, start_r, start_c, 14);

    printf("===============Filled heart===============\n");
    print_array(A);
    FILE*fp2 = fopen("output.txt", "w");
    for (i = 0; i < 14; i++)
    {
        for (j = 0; j < 14; j++)
        {
            fprintf(fp2, "%d ", A[i][j]);
        }
        fprintf(fp2, "\n");
    }
    fclose(fp2);

    return 0;

}
