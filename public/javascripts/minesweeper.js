
let width = 10;
let height = 10;
let bombs = 20;
let tiles = [];
let showBombs = false;
let tileSize = 40;
let flipped = 0;

let gameActive = false;



let colors = ["White", "Black", "Navy", "Purple", "MediumVioletRed", "Maroon", "OrangeRed", "DarkRed", "Red"];

class Tile {

    constructor(x, y, isBomb) {
        this.x = x;
        this.y = y;
        this.id = toNum([this.y, this.x]);
        this.isBomb = isBomb;
        this.links = [];
        this.size = tileSize;
        this.flipped = false;
        this.inter = "";
        this.adj = 0;
        this.flagged = false;
        this.exp = false;
    }

    style() {
        let bg = "bg-dark";
        if(this.flipped) {
            bg = "bg-light";
        } else if(this.exp) {
            bg = "bg-danger";
        } else if (this.flagged) {
            bg = "bg-warning";
        }
        return `'max-width: ${this.size}px; height: ${this.size}px;' class='col border border-dark ${bg} m-2'`;
    }

    html() {
        return `<div style=${this.style()} id=${this.id} oncontextmenu="return false" onmousedown="tiles[${this.y}][${this.x}].onClick(event);" ><p style="color: ${!this.flipped ? "White" : colors[this.adj]}; position: relative; top: 50%; transform: translateY(-50%); " class="text-center"><strong>${this.inter}</strong></p></div>`;
    }

    adjBombs() {
        return this.links.reduce((acc, curr) => {
            if(curr.isBomb) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }

    setBomb() {
        this.isBomb = true;
    }

    flip() {
        this.flipped = true;
        this.adj = this.adjBombs();
        if(this.adj === 0) {
            this.flipLinks();
        } else {
            this.inter = this.adj;
        }
        this.update();
        ++flipped;
        if(flipped === width * height - bombs) {
            winGame();
        }
    }

    flipLinks() {
        this.links.forEach((x) => {
            if(!x.flipped) {
                x.flip();
            }
        })
    }

    flag() {
        if(!this.flagged) {
            this.flagged = true;
        } else {
            this.flagged = false;
        }
        this.update();
    }

    onClick(e) {
        if(gameActive) {
            if(e.button === 0) {
                if(this.isBomb) {
                    endGame();
                } else if (!this.flipped) {
                    this.flip();
                }
            } else {
                if(!this.flipped) {
                    this.flag();
                }
            }
        }   
    }

    update() {
        if(showBombs && this.isBomb) {
            this.inter = "💣";
        }
        $(`#${this.id}`).replaceWith(this.html());
    }

}

function toCords(n) {
    return [Math.floor(n / width), n % width]; //[y, x]
}

function toNum(c) { //[y, x]
    return c[0] * width + c[1];
}

function endGame() {
    gameActive = false;
    tiles.forEach((x) => {x.forEach((t) => {

        if(t.isBomb) {
            
            t.exp = true;
            
            t.update();
            console.log(t.inter);
        }
    })});
    $("#message").html("Game Over");
    $('#display').removeClass('d-none');
}

function winGame() {
    gameActive = false;
    $("#message").html("You Win!");
    $('#display').removeClass('d-none');
}

function startGame() {
    resetBoard();
    gameActive = true;
    $('#display').addClass('d-none');
}

function makeLinks(y, x) {
    for(let t = 0; t < Math.PI * 2; t += Math.PI / 4) {
        let _y = y + Math.round(Math.sin(t)); 
        let _x = x + Math.round(Math.cos(t));
        if(_y >= 0 && _y < height && _x >= 0 && _x < width) {
            tiles[y][x].links.push(tiles[_y][_x]);
        }
    }
}

function updateAll() {
    tiles.forEach((r) => {
        r.forEach((t) => {
            t.update();
        });
    });
}

function resetBoard() {

    tiles = [];
    flipped = 0;

    for(let y = 0; y < height; ++y) {
        tiles.push([]);
        $('#game').append(`<div class='row' id='row${y}'></div>`);
        for(let x = 0; x < width; ++x) {
            tiles[y].push(new Tile(x, y, false));
            $(`#row${y}`).append(`<div id="${width * y + x}"></div>`)
        }
    }
    //make bombs
    for(let i = 0; i < bombs; ++i) {
        let c = toCords(Math.floor(Math.random() * width * height));
        while(tiles[c[0]][c[1]].isBomb) c = toCords(Math.floor(Math.random() * width * height));
        tiles[c[0]][c[1]].setBomb();
    }

    //set links
    for(let y = 0; y < height; ++y) {
        for(let x = 0; x < width; ++x) {
            makeLinks(y, x);
        }
    }

    updateAll();
    
}



//main
$(document).ready(() => {
    
    startGame();

});