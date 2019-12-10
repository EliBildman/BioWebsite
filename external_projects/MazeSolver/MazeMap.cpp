//
//  MazeMap.cpp
//  MazeSolver
//
//  Created by Eli Bildman on 8/23/19.
//  Copyright © 2019 Eli Bildman. All rights reserved.
//

#include "MazeMap.hpp"
#include <stdlib.h>
#include <iostream>
#include <math.h>
#include "Tiles.hpp"

MazeMap::MazeMap(bool* bitmap, int total) {
    this->bitmap = bitmap;
    this->len = sqrt(total);
    this->total = total;
    this->marked = new bool[total];
//    this->origin = (struct Coord *) malloc(sizeof(struct Coord));
    this->origin = (struct Coord) {0, 0};
//    this->target = (struct Coord *) malloc(sizeof(struct Coord));
    this->target = (struct Coord) {len - 1, len - 1};
    clearAll();
}

int MazeMap::etrx(int i) {
    return i / this->len;
}

int MazeMap::etry(int i) {
    return i % this->len;
}

int MazeMap::etri(int x, int y) {
    return this->len * y + x;
}

bool MazeMap::isPath(int x, int y) {
    return x >= 0 && x < this->len && y >= 0 && y < this->len && bitmap[etri(x, y)] == 0;
}

void MazeMap::mark(int x, int y) {
    this->marked[this->etri(x, y)] = true;
}

bool MazeMap::isMarked(int x, int y) {
    return this->marked[this->etri(x, y)];
}

void MazeMap::clearAll() {
    for(int i = 0; i < total; i++) marked[i] = 0;
}

struct Coord * MazeMap::getNeighbors(int x, int y, bool unmarked) {
    //static struct Coord *neighs = (struct Coord *) calloc(sizeof(struct Coord), 5);
    static struct Coord neighs[5];
    int ds[8] = {1, 0, 0, 1, -1, 0, 0, -1};
    int j = 0;
    for(int i = 0; i < 4; i++) {
//        std::cout << (isMarked(x + ds[i * 2], y + ds[i * 2 + 1])) << std::endl;
        if(isPath(x + ds[i * 2], y + ds[i * 2 + 1]) && !(unmarked && isMarked(x + ds[i * 2], y + ds[i * 2 + 1]))) {
            neighs[j++] = (struct Coord) {x + ds[i * 2], y + ds[i * 2 + 1]};
        }
    }
    neighs[j++] = (struct Coord) {-1, -1};
    return neighs;
}

struct Coord MazeMap::getNeighborUnmarked(int x, int y) {
    struct Coord *neighs = getNeighbors(x, y, true);
    if(!coordNeg(neighs[0])) {
        
        return neighs[0];
    }
    //std::cout << "default" << std::endl;
    return (struct Coord) {-1, -1};
}
