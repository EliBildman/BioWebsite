
# solver: DFS.cpp main.cpp MazeMap.cpp Tile.cpp
# 	g++ -o build/MazeSolver DFS.cpp main.cpp MazeMap.cpp Tile.cpp

CC = g++
SRCS := $(wildcard *.cpp)

all: $(SRCS)
	${CC} -o build/MazeSolver $(SRCS)


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