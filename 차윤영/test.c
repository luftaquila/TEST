#include <stdio.h>
#include <string.h>

int main()
{
    char str1[2001] = "This is simple string.";
    char str2[] = "is";
    char str3[] = "a";

    int str_num = 2;
    int location[2] = {2, 5};
    int r;

    char tmp[2001];
    strcpy(tmp, str1);

    printf("%s\n", str1);

    int wordsize = strlen(str2);

    if (strlen(str2) >= strlen(str3)){
        int gap = strlen(str2) - strlen(str3);
        int strsize = strlen(str1) - gap*str_num;

        for (int i = 0; i < str_num; i++){
        location[i] = location[i] - gap*i;
        }

        for (int i = 0; i < str_num; i++)
        {
            int k = location[i];

            for (int j = k, r = 0; r < strlen(str3); j++, r++){
                str1[j] = str3[r];
            }

            for (int j = k+wordsize-gap, r = 0; j < strsize; j++, r++){
                str1[j] = tmp[k+wordsize+r];
            }

            strcpy(tmp, str1);
        }
        str1[strsize] = '\0';
    }

    else{
        int gap = strlen(str3) - strlen(str2);
        int strsize = strlen(str1) + gap*str_num;

        for (int i = 0; i < str_num; i++){
        location[i] = location[i] + gap*i;
        }

        for (int i = 0; i < str_num; i++)
        {
            int k = location[i];

            for (int j = k, r = 0; r < strlen(str3); j++, r++){
                str1[j] = str3[r];
            }

            for (int j = k+wordsize+gap, r = 0; j < strsize; j++, r++){
                str1[j] = tmp[k+wordsize+r];
            }
            strcpy(tmp, str1);
        }
    }
    printf("%s\n", str1);

    return 0;
}
