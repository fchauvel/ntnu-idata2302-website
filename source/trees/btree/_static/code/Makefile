

all: main.c btree.o student.o table.o
	gcc main.c btree.o student.o table.o

%.o: %.c %.h
	gcc -c $<

clean:
	rm -rf a.out *.o

