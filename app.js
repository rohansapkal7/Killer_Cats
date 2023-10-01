var map = document.querySelectorAll(".game-screen div");
var landingPage = document.getElementById("lp");
const gameover = document.getElementById("gameOver");

var maxPlayers = 0; // total number of Players
var ct = 0; // Current Turn
var colSwitch=0; // used to alter color for game-board
var powerCounter=1; // used as counter to spawn powers

var powerBit=0; // used to Initialize Power
var falsePowerMove = false; // used to check Power is used proper or not

//---------------- Boundries ------------------------------

var topBoundry = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
var bottomBoundry = [182,183,184,185,186,187,188,189,190,191,192,193,194,195];
var leftBoundry = [0,14,28,42,56,70,84,98,112,126,140,154,168,182];
var rightBoundry = [13,27,41,55,69,83,97,111,125,139,153,167,181,195];

//-----------------------------------------------------------

var consoles = [4]; // Consoles of Players
consoles[0] = document.getElementById("c1");
consoles[1] = document.getElementById("c2");
consoles[2] = document.getElementById("c3");
consoles[3] = document.getElementById("c4");

var middleButtons = [4]; // Middle Buttons of Player Consoles
middleButtons[0] = document.getElementById("mbp1");
middleButtons[1] = document.getElementById("mbp2");
middleButtons[2] = document.getElementById("mbp3");
middleButtons[3] = document.getElementById("mbp4");

var consoleButtons = [4]; // Console Buttons of Player Consoles
consoleButtons[0] = document.querySelectorAll("#c1 button");// p1
consoleButtons[1] = document.querySelectorAll("#c2 button");// p2
consoleButtons[2] = document.querySelectorAll("#c3 button");// p3
consoleButtons[3] = document.querySelectorAll("#c4 button");// p4

// All Spirits Here!

var spirits = ["imgs/p1.png","imgs/p2.png","imgs/p3.png","imgs/p4.png"];
var powerSpirits = ["imgs/pow1.png","imgs/pow2.png","imgs/pow3.png","imgs/pow4.png","imgs/pow5.png"];

var skullSpirits = ["imgs/skullp1.png","imgs/skullp2.png","imgs/skullp3.png","imgs/skullp4.png"]

// All Player Central Data
let playerData = [
    {tag : "Player 1", pos : -1, status:0, power:-1, shield : false, sticked :-1 },
    {tag : "Player 2", pos : -1, status:0, power:-1, shield : false, sticked :-1 },
    {tag : "Player 3", pos : -1, status:0, power:-1, shield : false, sticked :-1 },
    {tag : "Player 4", pos : -1, status:0, power:-1, shield : false, sticked :-1 },
];
// 0 195 13 182
// All Player Starting Positions

let StartingPos = [15,180,26,169];

// All Powers Central Data
var powerData = [];

var trapsData = [];

let teleportGuide = [
    {x : 1, y : 1},
    {x : 12, y : 12},
    {x : 1, y : 12},
    {x : 12, y : 1}
]

// ======================== ALL SOUNDS HERE ==============================

var stepSound = new Audio("sounds/pop.mp3");
var victorySong = new Audio('sounds/VictorySong.mp3');
var tranSound = new Audio("sounds/TransitionSound.mp3");
var catdead = new Audio("sounds/CatDeath.WAV");
var bgm = new Audio("sounds/bgm.mp3");

//=========================================== Initialization =========================================

function Initialize(mp){

    bgm.pause();
    tranSound.play()

    maxPlayers = mp;
    
    for(var i=ct;i<maxPlayers;i++)
    {
        map[StartingPos[i]].style.backgroundImage = "url("+spirits[i]+")";
        playerData[i].pos = StartingPos[i];
        playerData[i].status = 1;
    }

    for(var i=0;i<4;i++)
    {
        if(i>=maxPlayers)
        {
            consoles[i].style.display = "none";
        }
    }

    // map colour

    for(var i=1;i<=196;i++){

        if(colSwitch===0){
            map[i-1].style.backgroundColor = "#AACB73";
            if(i%14!=0){
                colSwitch=1;
            }
        }else{
            map[i-1].style.backgroundColor = "#CDE990";
            if(i%14!=0){
                colSwitch=0;
            }
        }
    }

    landingPage.style.top = "-101%";

}

//map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";

//=================================  Set Power Bits 1/0  =====================================================

function setPowerBit(whosPower){
    if(ct===whosPower){
        if(playerData[ct].power>=0 && powerBit===0){
            powerBit = 1;
            middleButtons[ct].style.backgroundColor = "yellow";
        }
        else{
            powerBit = 0;
            middleButtons[ct].style.backgroundColor = "rgb(253, 208, 149)";
        }
        
    }
}


// ================================  MOVEMENT FUNCTIONS  =====================================================

function GOBM(validate)
{
    if(validate===ct+1)
    {
        if(powerBit===1){
            usePower(playerData[ct].power,"BM");
            update();
            disBorderToConsole();
        }
        else{
            if(isCorrectMove(playerData[ct].pos,bottomBoundry)){
                map[playerData[ct].pos].style.backgroundImage = null;
                playerData[ct].pos  = playerData[ct].pos + 14;
                teleportGuide[ct].x++;   
                map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
                
                update();
                disBorderToConsole();
                //ct++;
                //if(ct===maxPlayers){ct = 0;}
            }
        }
    }
}

function GOBR(validate)
{
    if(validate===ct+1)
    {
        if(powerBit===1){
            usePower(playerData[ct].power,"BR");
            update();
            disBorderToConsole();
        }
        else{
            if(isCorrectMove2(playerData[ct].pos,rightBoundry,bottomBoundry))
            {
                map[playerData[ct].pos].style.backgroundImage = null;
                playerData[ct].pos  = (playerData[ct].pos + 14)+1;
                teleportGuide[ct].x++;
                teleportGuide[ct].y++;   
                map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
                
                update();
                disBorderToConsole();
                // ct++;
                // if(ct===maxPlayers){ct = 0;}
            }
        }
    }
}

function GoTL(validate)
{
    if(validate===ct+1)
    {
        if(powerBit===1){
            usePower(playerData[ct].power,"TL");
            update();
            disBorderToConsole();
        }
        else{
            if(isCorrectMove2(playerData[ct].pos,topBoundry,leftBoundry))
            {
                map[playerData[ct].pos].style.backgroundImage = null;
                playerData[ct].pos  = (playerData[ct].pos - 14)-1;
                teleportGuide[ct].x--;
                teleportGuide[ct].y--;   
                map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
               
                update();
                disBorderToConsole();
                // ct++;
                // if(ct===maxPlayers){ct = 0;}
            }
        }
    }
}

function GoTM(validate)
{
    if(validate===ct+1)
    {
        if(powerBit===1){
            usePower(playerData[ct].power,"TM");
            update();
            disBorderToConsole();
        }
        else{
            if(isCorrectMove(playerData[ct].pos,topBoundry))
            {
                map[playerData[ct].pos].style.backgroundImage = null;
                playerData[ct].pos  = (playerData[ct].pos - 14);
                teleportGuide[ct].x--;   
                map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
                
                update();
                disBorderToConsole();
                // ct++;
                // if(ct===maxPlayers){ct = 0;}
            }
        }
    }
}

function GOTR(validate)
{
    if(validate===ct+1)
    {
        if(powerBit===1){
            usePower(playerData[ct].power,"TR");
            update();
            disBorderToConsole();
        }
        else{
            if(isCorrectMove2(playerData[ct].pos,topBoundry,rightBoundry))
            {
                map[playerData[ct].pos].style.backgroundImage = null;
                playerData[ct].pos  = (playerData[ct].pos - 14)+1; 
                teleportGuide[ct].x--;
                teleportGuide[ct].y++;  
                map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
                
                update();
                disBorderToConsole();
                // ct++;
                // if(ct===maxPlayers){ct = 0;}
            }
        }
    }
}

function GOL(validate)
{
    if(validate===ct+1)
    {
        if(powerBit===1){
            usePower(playerData[ct].power,"LL");
            update();
            disBorderToConsole();
        }
        else{
            if(isCorrectMove(playerData[ct].pos,leftBoundry))
            {
                map[playerData[ct].pos].style.backgroundImage = null;
                playerData[ct].pos  = (playerData[ct].pos - 1);
                teleportGuide[ct].y--;   
                map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
                
                update();
                disBorderToConsole();
                // ct++;
                // if(ct===maxPlayers){ct = 0;}
            }
        }
    }
}

function GOR(validate)
{
    if(validate===ct+1)
    {
        if(powerBit===1){
            usePower(playerData[ct].power,"RR");
            update();
            disBorderToConsole();
        }
        else{
            if(isCorrectMove(playerData[ct].pos,rightBoundry))
            {
                map[playerData[ct].pos].style.backgroundImage = null;
                playerData[ct].pos  = (playerData[ct].pos + 1);
                teleportGuide[ct].y++;   
                map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
                
                update();
                disBorderToConsole();
                // ct++;
                // if(ct===maxPlayers){ct = 0;}
            }
        }
    }
}

function GOBL(validate)
{
    if(validate===ct+1)
    {
        if(powerBit===1){
            usePower(playerData[ct].power,"BL");
            update();
            disBorderToConsole();
        }
        else{
            if(isCorrectMove2(playerData[ct].pos,leftBoundry,bottomBoundry))
            {
                map[playerData[ct].pos].style.backgroundImage = null;
                playerData[ct].pos  = (playerData[ct].pos + 14)-1;
                teleportGuide[ct].x++;
                teleportGuide[ct].y--;   
                map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
                
                update();
                disBorderToConsole();
                // ct++;
                // if(ct===maxPlayers){ct = 0;}
            }
        }
    }
}

// ============================================= MOVEMENT VALIDATE FUNCTION  ===============================

function isCorrectMove(posToCheck,checkArr)
{
    for(var i=0;i<14;i++)
    {
        if(posToCheck===checkArr[i])
        {
            return false;
        }
    }
    return true;
}

function isCorrectMove2(posToCheck,checkArr1,checkArr2)
{
    if(isCorrectMove(posToCheck,checkArr1))
    {
        if(isCorrectMove(posToCheck,checkArr2))
        {
            return true;
        }
        else{
            return false;
        }
    }
    else
    {
        return false;
    }
    
}

//============================================== Update Game Bord =============================================

function update()
{
    stepSound.play();
    checkDeath();
    updatePowCnt();
    addPow();
    disPow();
    disTraps();
    collectPower();
    disPowInBtn();

    if(falsePowerMove){
        ct--;
        falsePowerMove = false;
    }

    updateCT();
    isGameOver();

}

function updatePowCnt(){
    powerCounter+=1;

    if(falsePowerMove){
        powerCounter-=1;
    }

    if(powerCounter>14){
        powerCounter = 1;
    }
}

function checkDeath()
{
    var i;
    for(i=0;i<maxPlayers;i++)
    {
        if(i!=ct && playerData[i].pos === playerData[ct].pos)
        {
            Kill(i);
        }
    }

    for(i=0;i<trapsData.length;i++){
        for(var j=0;j<maxPlayers;j++){

            if(playerData[j].pos === trapsData[i]){
            
                if(playerData[j].shield === true){
                    playerData[j].shield = false;
                    playerData[j].power = -1;
                    middleButtons[j].style.backgroundImage = null;
                    trapsData.splice(i);
                }
                else
                {
                    Kill(j);
                    map[playerData[j].pos].style.backgroundImage = "url("+skullSpirits[j]+")";
                    trapsData.splice(i);
                }
                
            }

        }
    }

}

function stepOnTrap(){

    if(trapsData.length===0){
        return;
    }
    
}

function collectPower(){
    
    if(powerData.length===0){
        return;
    }

    for(var i=0;i<powerData.length;i++){
        if(powerData[i].pos === playerData[ct].pos){
            playerData[ct].power = powerData[i].PI;
            
            if(playerData[ct].power===2){
                playerData[ct].shield = true;
            }
            else
            {
                playerData[ct].shield = false;
            }
            powerData.splice(i,maxPlayers);
        }
        map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
    }
}

function updateCT()
{
    ct++;
    //powerCounter++;
    if(ct===maxPlayers){ct=0;}
    //if(powerCounter>14){powerCounter=1;}
    if(playerData[ct].status === 0 || playerData[ct].sticked>=0){
        playerData[ct].sticked--;
        updateCT();
    }
}

// Adding Power in Power Data

function addPow()
{
    var p,i,powInd;
    if(powerCounter===14){
        p = Math.floor(Math.random() * 196);
    }else{
        return;
    }
    powInd = Math.floor(Math.random() * 5);
    for(i=0;i<maxPlayers;i++){
        if(p===playerData[i].pos){
            addPow();
        }else{
            powerData.push({pos : p, PI : powInd});
        }
    }
}

function disPow()
{
    if(powerData.length ===0){
        return;
    }else{
        for(var i=0;i<powerData.length;i++){
            map[powerData[i].pos].style.backgroundImage = "url("+powerSpirits[powerData[i].PI]+")";
        }
    }
}

function disTraps()
{
    for(let i=0;i<trapsData.length;i++){
        map[trapsData[i]].style.backgroundImage = "url(imgs/blackHole.png)";
    }
}

function disPowInBtn()
{
    for(var i=0;i<maxPlayers;i++){
        if(playerData[i].power != -1){
            middleButtons[i].style.backgroundImage = "url("+powerSpirits[playerData[i].power]+")";
        }
    }
}

function Kill(who)
{
    catdead.play()
    playerData[who].status = 0;
    playerData[who].power = -1; 
    playerData[who].shield = false;
    playerData[who].sticked = -1;
    middleButtons[who].style.backgroundImage = null;
    consoles[who].style.display = "none";
    return 
}

function disBorderToConsole(){
    consoles[0].classList.remove("highlight");
    consoles[1].classList.remove("highlight");
    consoles[2].classList.remove("highlight");
    consoles[3].classList.remove("highlight");
    consoles[ct].classList.add("highlight");
}

function isGameOver(){
    var alive = 0;
    for(var i=0;i<maxPlayers;i++){
        if(playerData[i].status === 1){
            alive++;
        }
    }
    if(alive === 1){
        for(var i=0;i<maxPlayers;i++){
            if(playerData[i].status === 1){
                
                break;
            }
        }
        setTimeout(showGameOver,1500);
    }
}

function showGameOver(){

    victorySong.play();
    var alive;

    for(var i=0;i<maxPlayers;i++){
        if(playerData[i].status === 1){
            alive = playerData[i].tag;
            break;
        }
    }

    document.querySelector(".Gameover p").innerHTML = `${alive} Won !`;

    gameover.style.right = "0%";
}

//========================== Power Mechanics Functions ================================

function usePower(whichPower,direction){
    if(whichPower===0){
        slimeAttack(direction);
    }

    if(whichPower===1){
        messAttack(direction);
    }

    if(whichPower===2){
        falsePowerMove = true;
    }

    if(whichPower===3){
        Teleport(direction);
    }

    if(whichPower===4){
        setTrap(direction);
    }
    powerBit = 0;
    middleButtons[ct].style.backgroundColor = "rgb(253, 208, 149)"
}

//==================================  SLIME ATTACK  ======================================

function slimeAttack(direction){

    var block = playerData[ct].pos;

    var i=6;
    
    if(direction==="BM"){  // slimeattack to bottom
        
        if(isCorrectMove(block,bottomBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(i>0){
            block+=14;
            // map[block].style.backgroundColor = "yellow";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                }
                else{
                    playerData[0].sticked = 2;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                }
                else{
                    playerData[1].sticked = 2;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                }
                else{
                    playerData[2].sticked = 2;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                }
                else{
                    playerData[3].sticked = 2;
                }
            }
            if(isCorrectMove(block,bottomBoundry)===false){
                break;
            }
            i--;
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="RR"){  // slimeattack to Right
        
        if(isCorrectMove(block,rightBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(i>0){
            block+=1;
            // map[block].style.backgroundColor = "yellow";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                }
                else{
                    playerData[0].sticked = 2;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                }
                else{
                    playerData[1].sticked = 2;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                }
                else{
                    playerData[2].sticked = 2;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                }
                else{
                    playerData[3].sticked = 2;
                }
            }
            if(isCorrectMove(block,rightBoundry)===false){
                break;
            }
            i--;
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="LL"){  // slimeattack to left
        
        if(isCorrectMove(block,leftBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(i>0){
            block-=1;
            // map[block].style.backgroundColor = "yellow";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                }
                else{
                    playerData[0].sticked = 2;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                }
                else{
                    playerData[1].sticked = 2;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                }
                else{
                    playerData[2].sticked = 2;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                }
                else{
                    playerData[3].sticked = 2;
                }
            }
            if(isCorrectMove(block,leftBoundry)===false){
                break;
            }
            i--;
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="TM"){  // slimeattack to top
        
        if(isCorrectMove(block,topBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(i>0){
            block-=14;
            // map[block].style.backgroundColor = "yellow";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                }
                else{
                    playerData[0].sticked = 2;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                }
                else{
                    playerData[1].sticked = 2;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                }
                else{
                    playerData[2].sticked = 2;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                }
                else{
                    playerData[3].sticked = 2;
                }
            }
            if(isCorrectMove(block,topBoundry)===false){
                break;
            }
            i--;
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="BL"){  // slimeattack to bottom-left
        
        if(isCorrectMove2(block,bottomBoundry,leftBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(i>0){
            block+=14;
            block-=1;
            // map[block].style.backgroundColor = "yellow";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                }
                else{
                    playerData[0].sticked = 2;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                }
                else{
                    playerData[1].sticked = 2;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                }
                else{
                    playerData[2].sticked = 2;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                }
                else{
                    playerData[3].sticked = 2;
                }
            }
            if(isCorrectMove2(block,bottomBoundry,leftBoundry)===false){
                break;
            }
            i--;
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="TR"){  // slimeattack to top-right
        
        if(isCorrectMove2(block,topBoundry,rightBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(i>0){
            block-=14;
            block+=1;
            // map[block].style.backgroundColor = "yellow";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                }
                else{
                    playerData[0].sticked = 2;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                }
                else{
                    playerData[1].sticked = 2;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                }
                else{
                    playerData[2].sticked = 2;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                }
                else{
                    playerData[3].sticked = 2;
                }
            }
            if(isCorrectMove2(block,topBoundry,rightBoundry)===false){
                break;
            }
            i--;
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="TL"){  // slimeattack to top-left
        
        if(isCorrectMove2(block,topBoundry,leftBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(i>0){
            block-=14;
            block-=1;
            // map[block].style.backgroundColor = "yellow";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                }
                else{
                    playerData[0].sticked = 2;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                }
                else{
                    playerData[1].sticked = 2;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                }
                else{
                    playerData[2].sticked = 2;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                }
                else{
                    playerData[3].sticked = 2;
                }
            }
            if(isCorrectMove2(block,topBoundry,leftBoundry)===false){
                break;
            }
            i--;
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="BR"){  // slimeattack to bottom-right
        
        if(isCorrectMove2(block,bottomBoundry,rightBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(i>0){
            block+=14;
            block+=1;
            // map[block].style.backgroundColor = "yellow";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                }
                else{
                    playerData[0].sticked = 2;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                }
                else{
                    playerData[1].sticked = 2;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                }
                else{
                    playerData[2].sticked = 2;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                }
                else{
                    playerData[3].sticked = 2;
                }
            }
            if(isCorrectMove2(block,bottomBoundry,rightBoundry)===false){
                break;
            }
            i--;
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }
}

//==============================  MESS ATTACK  ===================================

function messAttack(direction){

    var block = playerData[ct].pos;
    
    if(direction==="BM"){  // mess attack to bottom
        
        if(isCorrectMove(block,bottomBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(true){
            block+=14;
            // map[block].style.backgroundColor = "red";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(0);
                    map[playerData[0].pos].style.backgroundImage = "url("+skullSpirits[0]+")";
                    break;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(1);
                    map[playerData[1].pos].style.backgroundImage = "url("+skullSpirits[1]+")";
                    break;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(2);
                    map[playerData[2].pos].style.backgroundImage = "url("+skullSpirits[2]+")";
                    break;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(3);
                    map[playerData[3].pos].style.backgroundImage = "url("+skullSpirits[3]+")";
                    break;
                }
            }
            if(isCorrectMove(block,bottomBoundry)===false){
                break;
            }
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="TM"){  // mess attack to top
        
        if(isCorrectMove(block,topBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(true){
            block-=14;
            // map[block].style.backgroundColor = "red";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(0);
                    map[playerData[0].pos].style.backgroundImage = "url("+skullSpirits[0]+")";
                    break;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(1);
                    map[playerData[1].pos].style.backgroundImage = "url("+skullSpirits[1]+")";
                    break;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(2);
                    map[playerData[2].pos].style.backgroundImage = "url("+skullSpirits[2]+")";
                    break;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(3);
                    map[playerData[3].pos].style.backgroundImage = "url("+skullSpirits[3]+")";
                    break;
                }
            }
            if(isCorrectMove(block,topBoundry)===false){
                break;
            }
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="RR"){  // mess attack to right
        
        if(isCorrectMove(block,rightBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(true){
            block+=1;
            // map[block].style.backgroundColor = "red";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(0);
                    map[playerData[0].pos].style.backgroundImage = "url("+skullSpirits[0]+")";
                    break;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(1);
                    map[playerData[1].pos].style.backgroundImage = "url("+skullSpirits[1]+")";
                    break;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(2);
                    map[playerData[2].pos].style.backgroundImage = "url("+skullSpirits[2]+")";
                    break;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(3);
                    map[playerData[3].pos].style.backgroundImage = "url("+skullSpirits[3]+")";
                    break;
                }
            }
            if(isCorrectMove(block,rightBoundry)===false){
                break;
            }
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="LL"){  // mess attack to left
        
        if(isCorrectMove(block,leftBoundry)===false){
            falsePowerMove = true;
            return;
        }

        while(true){
            block-=1;
            // map[block].style.backgroundColor = "red";

            
            if(block===playerData[0].pos){
                if(playerData[0].shield===true){
                    playerData[0].shield = false;
                    playerData[0].power = -1;
                    middleButtons[0].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(0);
                    map[playerData[0].pos].style.backgroundImage = "url("+skullSpirits[0]+")";
                    break;
                }
            }
            if(block===playerData[1].pos){
                if(playerData[1].shield===true){
                    playerData[1].shield = false;
                    playerData[1].power = -1;
                    middleButtons[1].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(1);
                    map[playerData[1].pos].style.backgroundImage = "url("+skullSpirits[1]+")";
                    break;
                }
            }
            if(block===playerData[2].pos){
                if(playerData[2].shield===true){
                    playerData[2].shield = false;
                    playerData[2].power = -1;
                    middleButtons[2].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(2);
                    map[playerData[2].pos].style.backgroundImage = "url("+skullSpirits[2]+")";
                    break;
                }
            }
            if(block===playerData[3].pos){
                if(playerData[3].shield===true){
                    playerData[3].shield = false;
                    playerData[3].power = -1;
                    middleButtons[3].style.backgroundImage = null;
                    break;
                }
                else{
                    Kill(3);
                    map[playerData[3].pos].style.backgroundImage = "url("+skullSpirits[3]+")";
                    break;
                }
            }
            if(isCorrectMove(block,leftBoundry)===false){
                break;
            }
        }
        playerData[ct].power = -1;
        middleButtons[ct].style.backgroundImage = null;
    }

    if(direction==="BL" || direction==="TR" || direction==="TL" || direction==="BR"){
        falsePowerMove = true;
    }

}

// ================================   TELEPORT   ===================================

function Teleport(direction){
    
    tranSound.play()

    if(direction==="BM"){
        teleportGuide[ct].x = 13;
        map[playerData[ct].pos].style.backgroundImage = null;
        playerData[ct].pos = bottomBoundry[teleportGuide[ct].y];
        map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
    }

    if(direction==="LL"){
        teleportGuide[ct].y = 0;
        map[playerData[ct].pos].style.backgroundImage = null;
        playerData[ct].pos = leftBoundry[teleportGuide[ct].x];
        map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
    }

    if(direction==="RR"){
        teleportGuide[ct].y = 13;
        map[playerData[ct].pos].style.backgroundImage = null;
        playerData[ct].pos = rightBoundry[teleportGuide[ct].x];
        map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
    }

    if(direction==="TM"){
        teleportGuide[ct].x = 0;
        map[playerData[ct].pos].style.backgroundImage = null;
        playerData[ct].pos = topBoundry[teleportGuide[ct].y];
        map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
    }

    if(direction==="BL"){
        map[playerData[ct].pos].style.backgroundImage = null;
        playerData[ct].pos = bottomBoundry[0];
        teleportGuide[ct].x = 13;
        teleportGuide[ct].y = 0;
        map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
    }

    if(direction==="TR"){
        map[playerData[ct].pos].style.backgroundImage = null;
        playerData[ct].pos = topBoundry[13];
        teleportGuide[ct].y = 13;
        teleportGuide[ct].x = 0;
        map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
    }

    if(direction==="TL"){
        teleportGuide[ct].x = 0;
        teleportGuide[ct].y = 0;
        map[playerData[ct].pos].style.backgroundImage = null;
        playerData[ct].pos = topBoundry[0];
        map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
    }

    if(direction==="BR"){
        teleportGuide[ct].x = 13;
        teleportGuide[ct].y = 13;
        map[playerData[ct].pos].style.backgroundImage = null;
        playerData[ct].pos = bottomBoundry[13];
        map[playerData[ct].pos].style.backgroundImage = "url("+spirits[ct]+")";
    }

    playerData[ct].power = -1;
    middleButtons[ct].style.backgroundImage = null;
}

//==================================   TRAP   ===================================

function setTrap(direction){

    var block = playerData[ct].pos;

    if(direction === "BM"){

        if(isCorrectMove(block,bottomBoundry)){
            trapsData.push(block+14);
        }else{
            falsePowerMove = true;
            return;
        }
    }

    if(direction === "TM"){

        if(isCorrectMove(block,topBoundry)){
            trapsData.push(block-14);
        }else{
            falsePowerMove = true;
            return;
        }
    }

    if(direction === "LL"){

        if(isCorrectMove(block,leftBoundry)){
            trapsData.push(block-1);
        }else{
            falsePowerMove = true;
            return;
        }
    }

    if(direction === "RR"){

        if(isCorrectMove(block,rightBoundry)){
            trapsData.push(block+1);
        }else{
            falsePowerMove = true;
            return;
        }
    }

    if(direction === "TR"){

        if(isCorrectMove2(block,rightBoundry,topBoundry)){
            trapsData.push((block-14)+1);
        }else{
            falsePowerMove = true;
            return;
        }
    }

    if(direction === "TL"){

        if(isCorrectMove2(block,leftBoundry,topBoundry)){
            trapsData.push((block-14)-1);
        }else{
            falsePowerMove = true;
            return;
        }
    }

    if(direction === "BR"){

        if(isCorrectMove2(block,rightBoundry,bottomBoundry)){
            trapsData.push((block+14)+1);
        }else{
            falsePowerMove = true;
            return;
        }
    }

    if(direction === "BL"){

        if(isCorrectMove2(block,leftBoundry,bottomBoundry)){
            trapsData.push((block+14)-1);
        }else{
            falsePowerMove = true;
            return;
        }
    }

    playerData[ct].power = -1;
    middleButtons[ct].style.backgroundImage = null;
}

function ContinueGame(){
    location.reload();
}

function handleGuide(show){
    if(show){
        document.querySelector(".guide").style.top = "0%"
    }else{
        document.querySelector(".guide").style.top = "-101%";
    }
}

function handleAboutus(show){
    if(show){
        document.querySelector(".aboutUs").style.top = "0%"
    }else{
        document.querySelector(".aboutUs").style.top = "101%";
    }
}

var isMute = parseInt(1);
var mute_icon_div = document.getElementById('mute');
mute_icon_div.addEventListener('click', function (){
    isMute++;
    if(isMute%2==0){
        mute_icon_div.style.backgroundImage = "url("+"svgs/sound.png"+")";
        bgm.play();
    }else{
        mute_icon_div.style.backgroundImage = "url("+"svgs/no-sound.png"+")";
        bgm.pause();
    }
})
