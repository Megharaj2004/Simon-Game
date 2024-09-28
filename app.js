let gameSeq=[];
let userSeq=[];

let btns=["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore=0;
let currentScore=0;

let h2=document.querySelector('h2');
let h3=document.querySelector('h3');
let startBtn=document.querySelector('#startBtn');

startBtn.addEventListener('click',function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    }, 250);
}

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    }, 100);
}

function levelUp(){
    userSeq=[];
    level++;
    currentScore=level;
    h2.innerText=`Level ${level}`;

    //random button choose
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        if(currentScore>highScore){
            highScore=currentScore;
        }
        h3.innerHTML=`High score: ${highScore-1}`;

        h2.innerHTML=`Game over! Your score was <b>${level-1}</b> <br>Press Play Again button to retry`;
        startBtn.innerText="Play Again"
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor='white';
        }, 150)
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

