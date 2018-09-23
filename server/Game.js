function Game(id,ps0){
    this.gameId = id;
    this.ps = new Array(2);
    this.ps[0] = ps0;
    this.isGameOn = false;
    this.count = 1;
}
 
Game.prototype.startGame = function() {
    for (const i in this.ps) {
        this.ps[i].emit('startGame',this.gameId,i);
    }
    this.isGameOn = true;
    console.log("starting @Game: "+this.gameId);
}
 
Game.prototype.sendOtherQuit = function(sock) {
    console.log("force killing @Game: "+this.gameId);
    for (const i in this.ps) { 
        if (this.ps[i]) {
            this.ps[i].emit("otherQuit");
        }
    }
}

Game.prototype.endGame = function() {
    console.log("ending @Game: "+this.gameId);
    for (const i in this.ps) { 
        if (this.ps[i]) {
            this.ps[i].gameId = undefined;
            this.ps[i].disconnect();
        }
    }
}

Game.prototype.sendMove = function(tid) {
    for (const i in this.ps) {
        this.ps[i].emit("moveR",tid);
    }
}
/*
Game.prototype.sendNoMove = function(dice,tid) {
    for (const i in this.ps) {
        this.ps[i].emit("noMoveR");
    }
}
*/
module.exports = Game;