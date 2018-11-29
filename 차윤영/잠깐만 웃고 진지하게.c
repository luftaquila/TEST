#include <stdio.h>
#include <stdlib.h>

void deleteArray(int *user, int start, int *u_count);

int main()
{
    int mem_or_not, ID, u_count = 0, n_count = 0, start, count = 0;
    FILE*fp1 = fopen("user_ID_list.txt", "r");
    FILE*fp2 = fopen("log.txt", "w");
    FILE*fp3 = fopen("in_member.txt", "w");
    int temp, del, size = 100;
    int *user;
    float rate;

    user = (int*)malloc(sizeof(int)*size);

    while (!feof(fp1))
    {
        fscanf(fp1, "%d %d", &mem_or_not, &ID);
        printf("%d %d %d %f %d %d\n", count++, mem_or_not, ID, rate, size, _msize(user) / sizeof(user));

        if (mem_or_not == 1)
        {
            user[u_count] = ID;

            rate = (float) u_count / size;
            if (rate >= 0.949999999999)
            {
                fprintf(fp2, "%d ", size);
                size *= 1.5;
                fprintf(fp2, "%d [%d]\n", size, u_count);
                user = (int*)realloc(user, sizeof(int)*size);
            }
            u_count++;
        }
        else
        {
            for (int i = 0; i < u_count; i++)
            {
                if (user[i] == ID)
                {
                    del = i;
                    break;
                }
            }
            temp = user[u_count-1];
            user[u_count-1] = user[del];
            user[del] = temp;
            u_count--;

            n_count++;

            rate = (float) u_count / size;
            if (rate < 0.50)
            {
                fprintf(fp2, "%d ", size);
                size *= 0.8;
                fprintf(fp2, "%d [%d]\n", size, u_count);
                user = (int*)realloc(user, sizeof(int)*size);
            }
        }
    }
    user = (int*)realloc(user, sizeof(int)*u_count);
    for (int i = 0; i < u_count; i++)
        fprintf(fp3, "%d\n", user[i]);

    printf("registered member : %d\n", u_count);
    printf("withdrawal member : %d\n", n_count);

    fclose(fp1);
    fclose(fp2);
    fclose(fp3);

    return 0;
}
