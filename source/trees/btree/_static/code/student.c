#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "student.h"


struct Student {
  int  id;
  char first_name[50];
  char last_name[50];
};


size_t sizeof_student = sizeof(Student);

Student*
new_student(int id, char* first_name, char* last_name)
{
  Student* student = malloc(sizeof(Student));
  student->id      = id;
  strncpy(student->first_name, first_name, sizeof(student->first_name)-1);
  strncpy(student->last_name, last_name, sizeof(student->last_name)-1);
  return student;
}


void
free_student(Student* student) {
  free(student);
}


int
id_of(Student* student) {
  return student->id;
}


char*
first_name_of(Student* student)
{
  return student->first_name;
}


char*
last_name_of(Student* student)
{
  return student->last_name;
}


void
show_student(Student* student)
{
  printf("%s, %s\n", last_name_of(student), first_name_of(student));
}
