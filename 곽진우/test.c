#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

//201920908 강신우

#define STUDENT_MAX_CNT 10  //학생 수

//조건1) 학생의 정보(이름, 나이, 학과)가 저장될 구조체 생성
typedef struct STUDENT {
    char name[20];
    int age;
    char dept[20];
}STUDENT;

//나이로 비교
int comp_age(const void*a, const void*b) {
    STUDENT* s1 = (STUDENT *) a;
    STUDENT* s2 = (STUDENT*)b;
    //만약 나이가 같으면 이름순으로,
    if (s1->age == s2->age) {
        return strcmp(s1->name, s2->name);
    }
    else return s2->age - s1->age;
}

//이름으로 비교
int comp_name(const void*a, const void*b) {
    STUDENT* s1 = (STUDENT *)a;
    STUDENT* s2 = (STUDENT*)b;
    return strcmp(s1->name, s2->name);
}

void LineUpAge(STUDENT *data, int people) {
    qsort(data, people, sizeof(data[0]), comp_age);
}

void FindStudent(STUDENT *student, char *word, int *people) {
    int i;

    printf("\n검색할 단어 [%s]에 해당하는 학생입니다.\n\n", word);

    //조건4) 나이순 정렬
    LineUpAge(student, STUDENT_MAX_CNT);

    //키워드와 일치하는 학생 찾아서 출력, 검색된 학생수 증가
    for (i = 0; i < STUDENT_MAX_CNT; i++) {
        if (strcmp(student[i].name, word) == 0) {
            (*people)++;
            printf(" %s     %d   %s\n", student[i].name, student[i].age, student[i].dept);

        }
        else if (strcmp(student[i].dept, word) == 0) {
            (*people)++;
            printf(" %s     %d   %s\n", student[i].name, student[i].age, student[i].dept);
        }
        else if (student[i].age == atoi(word)) {
            (*people)++;
            printf(" %s     %d   %s\n", student[i].name, student[i].age, student[i].dept);
        }
    }
    printf("\n");
}

int main() {

    int i;
    STUDENT student_list[STUDENT_MAX_CNT];
    int people = 0; //조건3) 검색된 학생수를 저장할 변수
    char keyword[20];

    //입력파일 읽어오기
    FILE *fp = fopen("student.txt", "r+");

    if (fp == NULL)
        return 0;

    for (i = 0; i < STUDENT_MAX_CNT; i++) {
        char temp[50];

        fgets(temp, sizeof(temp), fp);
        /*fscanf(fp, "%s", student_list[i].name);
        fscanf(fp, "%d", &student_list[i].age);
        fscanf(fp, "%s", student_list[i].dept);*/
        printf("%s\n", temp);
        printf("\n");
    }

    //조건2) 학생 이름순 정렬
    qsort(student_list, STUDENT_MAX_CNT, sizeof(student_list[0]), comp_name);

    //학생 전체 출력
    printf("   학생목록(이름정렬)\n\n");
    for (i = 0; i < STUDENT_MAX_CNT; i++) {
        printf(" %s     %d   %s\n", student_list[i].name, student_list[i].age, student_list[i].dept);
    }


    printf("\n\n  검색할 단어를 입력하세요: ");
    scanf("%s", keyword);

    FindStudent(student_list, keyword, &people);    //Find 에서 people을 변경할수 있게 포인터로 넘김
    printf(" 검색결과 총 %d명이 검색되었습니다.\n\n", people);

    return 0;
}
