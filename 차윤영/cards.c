#include <stdio.h>
#include <time.h>
#include <stdlib.h>

int main()
{
  int card;
  char suit[4] = {'c', 'd', 'h', 's'}, rank[13] = {'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'};
  char deck[100][3], str[3], tmp[3];
  srand(time(NULL));

  printf("Enter number of cards : ");
  scanf("%d", &card);
  for(int i = 0; i < card; i++) { printf("%c%c ", rank[rand() % 13], suit[rand() % 4]); }
}
