#ifndef STUDENT_H
#define STUDENT_H

typedef struct Student Student;


extern size_t sizeof_student;

Student*
new_student(int id, char* first_name, char* lastname);

void
free_student(Student* student);

int
id_of(Student* student);

char*
first_name_of(Student* student);

char*
last_name_of(Student* student);

void
show_student(Student* student);

#endif
