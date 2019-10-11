//
//  main.cpp
//  MazeSolver
//
//  Created by Eli Bildman on 8/9/19.
//  Copyright © 2019 Eli Bildman. All rights reserved.
//

#include "MazeMap.hpp"
#include "DFS.hpp"
#include <iostream>
#include <fstream>

bool * convert(int len, const char ** bitmap) {
    bool * map = (bool *) calloc((sizeof(bool)), len);
    for(int i = 0; i < len; i++) {
        map[i] = (bitmap[i][0] == '1');
    }
    return map;
}

int main(int argc, const char * argv[]) {
    
    MazeMap *x = new MazeMap(convert(argc - 1, argv + 1), argc - 1);

    struct Solution solution = depthFirstSearch(x);

    printSol(solution);
    
    return 0;
}

