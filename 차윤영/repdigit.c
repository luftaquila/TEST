#include <stdio.h>
#include <string.h>
int main()
{
  int input, i;
  char str[100], dic[100];

  printf("Enter a number : ");
  scanf("%d", &input);
  sprintf(str, "%d", input);
  for(i = 0; str[i] != NULL; i++) {}
  for(int j = 0; j < i; j++)
  {
    if(strchr(str + j + 1, str[j]) != NULL)
    {
      printf("Repeated digit\n");
      return 0;
    }
  }
  printf("No Repeated Digit\n");
  return 0;
}
