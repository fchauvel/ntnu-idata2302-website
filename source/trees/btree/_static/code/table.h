

#ifndef TABLE_H
#define TABLE_H

typedef struct Table Table;

Table*
table_create(char* file_name, size_t item_size);

void
table_add(Table* table, void* item);

void
table_close(Table* table);

#endif
