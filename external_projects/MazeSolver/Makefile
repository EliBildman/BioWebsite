
# solver: DFS.cpp main.cpp MazeMap.cpp Tile.cpp
# 	g++ -o build/MazeSolver DFS.cpp main.cpp MazeMap.cpp Tile.cpp

CC = g++
FLAGS = -c

all: main

main: main.o DFS.o MazeMap.o Tiles.o
	${CC} -o build/MazeSolver main.o DFS.o Tiles.o MazeMap.o

main.o: main.cpp
	${CC} ${FLAGS} main.cpp

DFS.o: DFS.cpp DFS.hpp
	${CC} ${FLAGS} DFS.cpp DFS.hpp

MazeMap.o: MazeMap.cpp MazeMap.hpp
	${CC} ${FLAGS} MazeMap.cpp MazeMap.hpp

Tiles.o: Tiles.cpp Tiles.hpp
	${CC} ${FLAGS} Tiles.cpp Tiles.hpp

clean:
	rm *.o *.gch build/MazeSolver

# Usage:
# make        # compile all binary
# make clean  # remove ALL binaries and objects
