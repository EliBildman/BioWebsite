//
//  MazeMap.hpp
//  MazeSolver
//
//  Created by Eli Bildman on 8/23/19.
//  Copyright © 2019 Eli Bildman. All rights reserved.
//

#ifndef MazeMap_hpp
#define MazeMap_hpp

#include <stdio.h>
#include "Tiles.hpp"

class MazeMap {
private:
    bool* bitmap;
    bool* marked;
    int len;
    int total;
    int etrx(int i);
    int etry(int i);
    int etri(int x, int y);
public:
    struct Coord origin;
    struct Coord target;
    MazeMap(bool* bitmap, int total);
    bool isPath(int x, int y);
    void mark(int x, int y);
    bool isMarked(int x, int y);
    void clearAll();
    struct Coord * getNeighbors(int x, int y, bool unmarked);
    struct Coord getNeighborUnmarked(int x, int y);
};


#endif /* MazeMap_hpp */

