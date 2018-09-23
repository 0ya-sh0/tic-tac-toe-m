var game, socket = new io(), gameId, playerId;

var submitId = function() {
    gameId = document.getElementById("input-gid").value;
    socket.emit("joinGame",gameId);
}

socket.on("startGame",function(g,p) {
    createGame(g,p);
});
/*
socket.on("succesCreateGame",function(gameId,playerId) {
    document.getElementById("input-container").style.display = "none";
    alert("Game created succefully wait for other players to join");
});

socket.on("succesJoinGame",function(gameId,playerId) {
    document.getElementById("input-container").style.display = "none";
    alert("Succesfully joined to the game, waiting for other players");
});

socket.on("failedCreateGame",function(gameId,playerId) {
    alert("This game id is used, please try another id");
});
*/
socket.on("otherQuit",function(gameId,playerId) {
    alert("User unexpectedly resigned the game, killing the game");
    setTimeout(document.location.reload(),2000);
});



function createGame(g, p) {
  gameId = g;
  playerId = p;
  document.getElementById('s-login').style.display = 'none';
  document.getElementById('s-game').style.display = 'block';
}

// keep your code clean so you can  it 
// use whitespaces

/* variables
move_no is for counting the move numbers.
moves is an array which is linear representation of the board
buttons are buttons in the HTML.
*/
var move_no=parseInt(0);
var moves =["a","a","a","a","a","a","a","a","a"];
var buttons=document.querySelectorAll("button.box");
var res=parseInt(0);


// for making the X's and O's on the board

function doMove(n)
{
    
    if(move_no%2==0){
      buttons[n].innerHTML="X";
    buttons[n].disabled=true;
    moves[n]="X";
    }   
    else 
      {buttons[n].innerHTML="O";
      buttons[n].disabled=true;
       moves[n]="O";
      }
     move_no+=1;
  
     checkpos();
  }
  

  function getmove(n) {
    if (move_no%2!= playerId) {
      return;
    }
    socket.emit("move",gameId,n);
  }

  socket.on("moveR",function(n) {
    doMove(n);
  });


  // check if the moves on the board
  function checkpos()
  { 

    // for checking columns    
    for(i=0;i<3;i+=1){ 
      if(moves[i]!="a"){
        if(moves[i]==moves[i+3] && moves[i+3]==moves[i+6])
        { 
            setTimeout(someone_won(moves[i]) , 1000)     ;     
            res=1;
        }
      }
    }


  //for checking rows
  for(i=0;i<7;i+=3){ 
      if(moves[i]!="a"){
        if(moves[i]==moves[i+1] && moves[i+1]==moves[i+2])
        {
            setTimeout(someone_won(moves[i]) , 1000)  ;      
            res=1;
         }
    }
  }


   // for checking diagonals
        if(moves[0]==moves[4] && moves[4]==moves[8] && moves[0]!="a")
        {
        setTimeout(someone_won(moves[0]) , 1000)  ;  
            res=1;
         }
          if(moves[2]==moves[4] && moves[4]==moves[6]  && moves[2]!="a" )
        {
         setTimeout(someone_won(moves[2]) , 1000)  ;      
         res=1;  
         }
    
    // if the game is tied that is all the moves have played
    if(move_no==9){
      if(res==0){
        game_is_tied();
      }
    }

}

 

// show the result on the result board
function someone_won(X){
  
  for(i=0;i<9;i+=1)
  {
    buttons[i].disabled = true;
    }

  game_over("Player " + X + " won.");

}


// show that game is tied
function game_is_tied(){
   game_over("Game is tied.");
   socket.emit("endGame",gameId);
}

function game_over(msg) {
  document.getElementById("result").innerHTML=msg;

}

// Refresh the game
function freshit(){ 

  var i; 
 for(i=0;i<9;i+=1)
  {
    buttons[i].innerHTML=" ";
    buttons[i].disabled = false;
   
  }
   moves =["a","a","a","a","a","a","a","a","a"];
    move_no=0;
    res=0;
    document.getElementById("result").innerHTML=("User Vs User");

}
