//
//  Tiles.cpp
//  MazeSolver
//
//  Created by Eli Bildman on 10/1/19.
//  Copyright © 2019 Eli Bildman. All rights reserved.
//

#include "Tiles.hpp"
#include <iostream>
#include <math.h>
#include <fstream>

void printCoord(struct Coord c) {
    std::cout << c.x << ", " << c.y << std::endl;
}

void printSol(struct Solution s) {
    for(int i = 0; i < s.len ; i++) {
        printCoord(s.path[i]);
    }
}

bool coordNeg(struct Coord c) {
    return c.x == -1 && c.y == -1;
}

bool solNeg(struct Solution s) {
    return s.len == -1;
}

bool coordsEq(struct Coord a, struct Coord b) {
    return a.x == b.x && a.y == b.y;
}

void writeCoordToFile(struct Coord c, std::ofstream *file)  {
    *file << "[" << c.x << ", " << c.y << "]";
}

void writeSolutionToFile(struct Solution s, std::ofstream *file) {
    *file << "[";
    for(int i = 0; i < s.len; i++) {
        writeCoordToFile(s.path[i], file);
        if(i  < s.len - 1) *file << ", ";
    }
    *file << "]";
}
