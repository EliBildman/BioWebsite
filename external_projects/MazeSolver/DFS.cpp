//
//  DFS.cpp
//  MazeSolver
//
//  Created by Eli Bildman on 10/1/19.
//  Copyright © 2019 Eli Bildman. All rights reserved.
//

#include "DFS.hpp"
#include "Tiles.hpp"
#include <stdlib.h>
#include <iostream>

struct Solution addPoint(struct Coord c, struct Solution sol) {
    struct Coord *path = (struct Coord *) calloc(sizeof(struct Coord), sol.len + 1);
    path[0] = c;
    for(int i = 0; i < sol.len; i++) {
        path[i + 1] = sol.path[i];
    }
    sol.len += 1;
//    printSol(sol);
//    std::cout << std::endl;
    
    free(sol.path);
    sol.path = path;
    return sol;
}

struct Solution starterSol(struct Coord c) {
    struct Coord * path = (struct Coord *) malloc(sizeof(struct Coord));
    path[0] = c;
    return (struct Solution) {1, path};
}

struct Solution search(MazeMap *map, struct Coord cur, struct Coord target) {
    
    map->mark(cur.x, cur.y);
    
    if(coordsEq(cur, target)) {
        return starterSol(cur);
    }
    
    struct Coord next = map->getNeighborUnmarked(cur.x, cur.y);
    
    while(!coordNeg(next)) {
        struct Solution forward = search(map, next, target);
        if(!solNeg(forward)) {
            return addPoint(cur, forward);
        }
        next = map->getNeighborUnmarked(cur.x, cur.y);
    }
    
    return (struct Solution) {-1, 0};
}

struct Solution depthFirstSearch(MazeMap *map) {
    return search(map, map->origin, map->target);
}
