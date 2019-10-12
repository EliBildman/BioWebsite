
# solver: DFS.cpp main.cpp MazeMap.cpp Tile.cpp
# 	g++ -o build/MazeSolver DFS.cpp main.cpp MazeMap.cpp Tile.cpp

CC = g++
FLAGS = -c

all: main

main: main.o DFS.o MazeMap.o Tiles.o
	sudo ${CC} -o build/MazeSolver main.o DFS.o Tiles.o MazeMap.o

main.o: main.cpp
	sudo ${CC} ${FLAGS} main.cpp

DFS.o: DFS.cpp DFS.hpp
	sudo ${CC} ${FLAGS} DFS.cpp DFS.hpp

MazeMap.o: MazeMap.cpp MazeMap.hpp
	sudo ${CC} ${FLAGS} MazeMap.cpp MazeMap.hpp

Tiles.o: Tiles.cpp Tiles.hpp
	sudo ${CC} ${FLAGS} Tiles.cpp Tiles.hpp

clean:
	sudo rm *.o *.gch build/MazeSolver

# Usage:
# make        # compile all binary
# make clean  # remove ALL binaries and objects

# .PHONY = all clean

# CC = g++                       # compiler to use

# LINKERFLAG = -lm

# SRCS := $(wildcard *.cpp)
# BINS := $(SRCS:%.cpp=%)

# all: ${BINS}

# %: %.o
# 	@echo "Checking.."
# 	${CC} ${LINKERFLAG} $< -o $@

# %.o: %.cpp
# 	@echo "Creating object.."
# 	${CC} -c $<

# clean:
# 	@echo "Cleaning up..."
# 	rm -rvf *.o ${BINS}