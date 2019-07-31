'use strict';
//function to open model after wining
function openModel(){
  //From :https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
  let txT="<b>Gongratulations</b> you win ******</b>If you want to play again Press (<b>X</b>) button<b>!***</b>";

  // Get the modal
  let modal = document.getElementById('myModal');

  // Get the modal-txt
  const modaTxt = document.getElementById("txt");
  //Set the modal text
  modaTxt.innerHTML=txT;

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  //Display the modal
  modal.style.display = "block";

  //When the user clicks on <span> (x), close the modal
  span.onclick = function() {

      modal.style.display = "none";
      //reload the page
       setTimeout(function (){
         location.reload();
         }, 1000);
     }

}
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    //initiate the enemy location
    this.x=x;
    this.y=y;

    //initiate the speed
    this.speed=speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dt=dt*(this.speed);
    this.x=(this.x)+dt*50;
    //check if the location is out
    if(this.x>=(83*5)){
      this.x=0;
    }

    //handle collision
    var distanceX=Math.abs(player.x-this.x);
    var distanceY=Math.abs(player.y-this.y);
    if(distanceX<=42 && distanceY<=50){
      //reset the game
      location=location;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
// This class contain an update(), render() and
// a handleInput() method.
class Player {
  constructor(x,y) {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load image
    this.sprite = 'images/char-boy.png';
    //initiate player location
    this.x=x;
    this.y=y;

  }
  update() {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.

      // this.x*=dt;
      // this.y*=dt;
  }

  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


  }
  // handleInput func
  handleInput(key){

    switch(key){
      case 'left' :{this.x= this.x-83;
                    break;
                   }
      case 'right':{this.x= this.x+83;
                    break;
                   }
      case 'up'   :{this.y= this.y-101;
                    break;
                   }
      case 'down' :{
                    //to make sure not press down at the biginig of the game
                    if(this.y<404){
                      this.y= this.y+101;
                    }
                    break;
                   }


    }


    //make sure the player cannot move off screen
    if(this.x>(83*5)){
      this.x=0;
    }
    if(this.x<(0)){
      this.x=83*5;
    }
    if(this.y>(101*4)){
      this.y=0;
    }
    if(this.y<(0)){
      this.y=101*4;
    }

    //if the player reaches the water the game should be reset
    if(this.y<1){
      setTimeout(function(){ openModel(); }, 100);


    }

  }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const allEnemies=[
    new Enemy(83     , 50  , 4),
    new Enemy((83*3) , 151 , 2),
    new Enemy((83*4) , 230 , 3),
    new Enemy((83*2) , 151 , 5),
];
// Place the player object in a variable called player
var player=new Player(83*2.5,404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
