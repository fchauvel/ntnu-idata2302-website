#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>

#include "table.h"



typedef struct Metadata {
  char name[50];
  size_t item_size;
} Metadata;



struct Table {
  Metadata metadata;
  FILE* records;
};


void
open_files(Table* table)
{
  char file_name[sizeof(table->metadata.name) + 4];
  sprintf(file_name, "%s.dat", table->metadata.name);
  struct stat buffer;
  int exists = stat(file_name, &buffer) == 0;
  table->records = fopen(file_name, "ab+");
  if (table->records == NULL) {
    perror("Unable to open the data file");
  }
  if (!exists) {
    fwrite(&table->metadata, 1, sizeof(Metadata), table->records);
  }
}


Table*
table_create(char* file_name, size_t item_size)
{
  Table* table = malloc(sizeof(Table));
  strncpy(table->metadata.name, file_name, sizeof(table->metadata.name)-1);
  table->metadata.item_size = item_size;
  open_files(table);
  return table;
}


void
table_add(Table* table, void* item) {
  fwrite(item, 1, table->metadata.item_size);
}

void
table_close(Table* table) {
  fclose(table->records);
  free(table);
}
