//
//  Tiles.hpp
//  MazeSolver
//
//  Created by Eli Bildman on 10/1/19.
//  Copyright © 2019 Eli Bildman. All rights reserved.
//

#ifndef Tiles_hpp
#define Tiles_hpp

#include <stdio.h>
#include <fstream>

struct Coord {
    int x;
    int y;
};

struct Solution {
    int len;
    struct Coord *path; //list of length len
};

bool coordNeg(struct Coord c);
bool solNeg(struct Solution s);
bool coordsEq(struct Coord a, struct Coord b);
void printCoord(struct Coord c);
void printSol(struct Solution s);
void writeCoordTofile(struct Coord c, std::ofstream *file);
void writeSolutionToFile(struct Solution s, std::ofstream *file);

#endif /* Tiles_hpp */
