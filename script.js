/*Selecting ball*/
let ball=document.querySelector(".ball");
/*Selecting board*/
let board =document.querySelector(".board");
/*Getting coordinates of the board*/

let bound=board.getBoundingClientRect();
let leftPaddle=document.querySelector(".left");
let rightPaddle=document.querySelector('.right');
let leftPlayerLife=3;
let rightPlayerLife=3;
let y=true;
let x=true;

/*Chnage color of lives*/
function setColor(indx){
  let allIcon=document.querySelectorAll(".fas.fa-circle");
  allIcon[indx].style.color="white";
}

/*EventListener  for left and right paddle*/
document.addEventListener("keydown", ev => {
  if(ev.key==='w'){
    movePaddle(leftPaddle, -window.innerHeight*0.1)
  }
  else if (ev.key==='s') {
    movePaddle(leftPaddle, window.innerHeight*0.1)
  }
  else if (ev.key==='ArrowUp') {
    movePaddle(rightPaddle, -window.innerHeight*0.1)
  }
  else if (ev.key==='ArrowDown') {
    movePaddle(rightPaddle, window.innerHeight*0.1)
  }
});

/*Movement of paddle*/
function movePaddle(cPaddle, change){
  let cPaddleBound=cPaddle.getBoundingClientRect();
/*Boundary condition*/
  if(cPaddleBound.top+change>=bound.top && cPaddleBound.bottom+change<=bound.bottom){
    cPaddle.style.top=cPaddleBound.top+change+"px";
  }
}

/*Rest the game*/
function resetGame(){
  ball.style.top=window.innerHeight*0.45+"px";
  ball.style.left=window.innerWidth*0.45+"px";
  requestAnimationFrame(moveBall);
}

function moveBall(){
  /*Getting coordinates of the ball*/
  let cordinate=ball.getBoundingClientRect();
  let top=cordinate.top;
  let left=cordinate.left;
  let right=cordinate.right;
  let bottom=cordinate.bottom;


//**********************No Collison between  paddle and ball *************
  /*If the ball misses the paddle*/
  let hasTouchedLeft= left <= bound.left;
  let hasTouchedRight=right >= bound.right;

  if(hasTouchedLeft || hasTouchedRight){
    if(hasTouchedLeft){
      leftPlayerLife--;
      setColor(leftPlayerLife);
      if(leftPlayerLife==0){
        alert("Game over! Player 2 wins");
         document.location.reload();
      }
      else{
        setTimeout(() => resetGame(), 1000);
          return;
      }
    }else{
        rightPlayerLife--;
        setColor(rightPlayerLife+3);
        if(rightPlayerLife==0){
          alert("Game over! Player 1 wins");
          document.location.reload();
        }
        else{
          setTimeout(() => resetGame(), 1000);
          return;
        }
    }
}

//***********************************************************

//***************************  Collison check **********************

  let leftPaddleBound=leftPaddle.getBoundingClientRect();
  let rightPaddleBound=rightPaddle.getBoundingClientRect();

  if(left<=leftPaddleBound.right && right>=leftPaddleBound.left &&
    top+20>=leftPaddleBound.top && bottom-20<=leftPaddleBound.bottom){
      x=!x;
    }
  if(left<=rightPaddleBound.right && right>=rightPaddleBound.left &&
      top+20>=rightPaddleBound.top && bottom-20<=rightPaddleBound.bottom){
        x=!x;
    }

//******************************************************************

/*Vertiacl check for ball*/
  if(top<=bound.top || bottom>=bound.bottom){
    y=!y;
  }
  /*Horizontal check for ball*/
  if(left<=bound.left || right>=bound.right){
    x=!x;
  }

/*Ball free movement*/
  ball.style.top=  y===true? top+4+"px": top-4+"px";
  ball.style.left= x===true? left+4+"px": left-4+"px";

  requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);
