
#include <stdio.h>
#include <stdlib.h>

#include "student.h"
#include "table.h"

int main(int argc, char** argv) {
  Table* table = table_create("students", sizeof_student);
  Student* franck = new_student(1, "Franck", "Chauvel");
  show_student(franck);
  table_add(table, franck);
  free_student(franck);
  table_close(table);
}
