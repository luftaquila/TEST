#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char* findStr(char *, char *);
void insertBracket(char *, char *, char *, int, int);
int main() {
  int menu, pos;
  char *inputStr = (char *)malloc(2000), schrStr[100], *ptr;
  char fwd[4], bwd[4];
  strcpy(fwd, "[[[");
  strcpy(bwd, "]]]");
  strcpy(inputStr, "This is a simple string");
  while(1) {
    printf("==========MENU==========\n1. PrintString\n2. Search\n3. Modify\n4.End\nInput Number : ");
    scanf("%d", &menu);
    switch(menu) {
      case 1 :
        printf("%s\n", inputStr);
        break;
      case 2 :
        printf("Input Word : ");
        scanf("%s", schrStr);
        ptr = findStr(inputStr, schrStr);
        while(ptr != NULL) {
          insertBracket(inputStr, fwd, bwd, strlen(inputStr) - strlen(ptr), strlen(schrStr));
          ptr = findStr(inputStr, schrStr);
        }
        printf("%s\n", inputStr);
        break;
      case 3 :
        break;
      case 4 :
        return 0;
      default : break;
    }
  }
  return 0;
}

char* findStr(char *inputStr, char *schrStr) {
  static char *old;
  if(old == NULL) old = inputStr;
  else inputStr = old;

  while(*inputStr != '\0') {
    char *pch_str1 = inputStr;
    char *pch_str2 = schrStr;
    int len = 0;
    while(*pch_str1 == *pch_str2 && *pch_str1 !='\0' && *pch_str2 != '\0') {
      pch_str1++;
      pch_str2++;
      len++;
    }
    if (len == strlen(schrStr)) {
      old = inputStr + 4;
      return inputStr;
    }
    inputStr++;
  }
  return NULL;
}

void insertBracket(char *inputStr, char *fwd, char *bwd, int loc, int len) {
  inputStr = (char *)realloc(inputStr, 2010);
  strcat(fwd, inputStr + loc);
  strcpy(inputStr + loc, fwd);
  strcat(bwd, inputStr + loc + len + 3);
  strcpy(inputStr + loc + len + 3, bwd);
  strcpy(fwd, "[[[");
  strcpy(bwd, "]]]");
  return;
}
