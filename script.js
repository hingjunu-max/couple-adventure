// =========================
// Couple Adventure
// script.js Part 1
// =========================


// ---------- 보물 목록 ----------

const treasuresList = [

"🐱<br>고양이",
"❤️<br>하트",
"🌼<br>노란꽃",
"🚲<br>자전거",
"🐶<br>강아지",
"🐞<br>곤충",
"🍎<br>사과",
"⭐<br>별",
"📮<br>우체통",
"🦋<br>나비",
"☁️<br>구름",
"🚗<br>빨간차",
"🐦<br>새",
"🎈<br>풍선",
"📷<br>카메라"

];



// ---------- 보물이 들어갈 칸 ----------

const treasureCells = [

"c1",
"c2",
"c3",
"c4",
"c5",
"c6",
"c7",
"c8",
"c9",
"c10",
"c11",
"c12"

];




// -------- 사용할 칸 (이동 순서) --------

const boardCells = [

    "start",

    "c1",
    "c2",
    "c3",

    "bonus",

    "c4",
    "c5",
    "c6",

    "rest",

    "c7",
    "c8",
    "c9",

    "bonus2",

    "c10",
    "c11",
    "c12"

];




// ---------- 배열 섞기 ----------

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j =
        Math.floor(Math.random()*(i+1));


        [array[i],array[j]] =
        [array[j],array[i]];

    }

}




// ---------- 보물 생성 ----------

function generateTreasures(){


    // 보물 배열 복사

    let temp =
    [...treasuresList];


    // 랜덤 섞기

    shuffle(temp);



    // 기존 보물 제거 + 새로운 보물 배치

    treasureCells.forEach((cell,index)=>{


        const box =
        document.getElementById(cell);



        if(box){


            box.innerHTML =
            temp[index];


        }


    });

// 보물 소유 초기화

if(typeof treasureMap !== "undefined"){

    for(let key in treasureMap){

        treasureMap[key] = null;

    }

}

    document.getElementById("eventArea").innerText =

    "✨ 새로운 보물이 배치되었습니다!";


}

// ---------- RESET ----------

function resetGame(){


    // 플레이어 위치 초기화

    players.junu.position = 0;
    players.hing.position = 0;



    // 현재 턴 초기화

    currentPlayer = null;



    // 하트 초기화

    players.junu.heart = 3;
    players.hing.heart = 3;



    document.getElementById("junuHeart").innerText =
    "💙💙💙";


    document.getElementById("hingHeart").innerText =
    "🩷🩷🩷";



    // 말 삭제

    document.querySelectorAll(".piece")
    .forEach(piece=>{
        piece.remove();
    });

// 땅 색 초기화

treasureCells.forEach(cell=>{

    const box =
    document.getElementById(cell);


    if(box){

        box.classList.remove(
            "owner-junu",
            "owner-hing"
        );

    }

});


    // 플레이어 선택 다시 표시

    document.getElementById("playerSelect")
    .style.display="block";



    // 화면 문구 초기화

    document.getElementById("turnText").innerText =
    "주누";


    document.getElementById("eventArea").innerText =
    "게임을 시작하려면 플레이어를 선택해주세요.";



    // 보물 랜덤 재배치

    generateTreasures();


}


// ---------- 카드 보기 ----------

function showCards(player){

alert(player+"의 보너스카드는 아직 없습니다.");

}




// ---------- 팝업 ----------

function closePopup(){

document.getElementById("popup").classList.add("hidden");

}



// ---------- 시작 ----------

window.onload=function(){

generateTreasures();

}

// =======================================
// Part 2 : 플레이어 + 주사위 + 이동
// =======================================


const players = {

    junu:{
        name:"💙 주누",
        position:0,
        icon:"💙",
	  heart:3
    },

    hing:{
        name:"🩷 힝이",
        position:0,
        icon:"🩷",
	 heart:3
    }

};


let currentPlayer = null;


// 시작 플레이어 선택

function startGame(player){

    document.getElementById("playerSelect").style.display="none";

    currentPlayer = player;

    document.getElementById("turnText").innerText =
    `${players[player].name} 차례!`;

    createPlayers();

}


// 말 생성

function createPlayers(){


    // 기존 말 제거

    document.querySelectorAll(".piece")
    .forEach(piece=>{
        piece.remove();
    });



    for(let p in players){

        const piece=document.createElement("div");

        piece.className="piece";

        piece.id=p;

        piece.innerText=players[p].icon;


        document
        .getElementById(
            boardCells[players[p].position]
        )
        .appendChild(piece);

    }

}

// 주사위 모양

const diceFaces=[
"⚀",
"⚁",
"⚂",
"⚃",
"⚄",
"⚅"
];


// 주사위 굴리기

function rollDice(){


    if(!currentPlayer){
        alert("먼저 플레이어를 선택해주세요!");
        return;
    }


 const dice=document.getElementById("dice");


    let count=0;


    const rolling=setInterval(()=>{

        dice.innerText =
        diceFaces[
            Math.floor(Math.random()*6)
        ];

        count++;


        if(count>=8){

            clearInterval(rolling);


            const result =
            Math.floor(Math.random()*6)+1;


            dice.innerText =
            diceFaces[result-1];


            movePlayer(
                currentPlayer,
                result
            );


        }


    },100);

}


// 말 이동

async function movePlayer(player, step){


    const piece =
    document.getElementById(player);



    for(let i=0; i<step; i++){


        players[player].position++;


        if(
            players[player].position >= boardCells.length
        ){

            players[player].position = 0;

        }



        const next =
        document.getElementById(
            boardCells[
                players[player].position
            ]
        );


        next.appendChild(piece);


        await wait(300);

    }



    // 도착 칸 확인

    const currentCell =
    boardCells[
        players[player].position
    ];



    // 보너스 카드

    if(
        currentCell === "bonus" ||
        currentCell === "bonus2"
    ){

        drawMission();

    }



    // 쉼터 하트 증가

    if(
        currentCell === "rest"
    ){

        addHeart(player);

    }



    // 보물 확인

    checkTreasure(player);



    // 다음 차례

    nextTurn();


}


// 이동 속도

function wait(ms){

    return new Promise(resolve=>
        setTimeout(resolve,ms)
    );

}



// 턴 변경

function nextTurn(){

    if(currentPlayer==="junu"){
        currentPlayer="hing";
    }
    else{
        currentPlayer="junu";
    }


    document.getElementById("turnText").innerText =
    `${players[currentPlayer].name} 차례!`;

}

//--addHeart 함수 추가

function addHeart(player){

    if(players[player].heart < 3){

        players[player].heart++;

    }


    const heartBox =
    document.getElementById(
        player + "Heart"
    );


    if(player === "junu"){

        heartBox.innerText =
        "💙".repeat(players[player].heart);

    }


    if(player === "hing"){

        heartBox.innerText =
        "🩷".repeat(players[player].heart);

    }

}

// 이벤트 표시

function showEvent(text){

    document.getElementById(
        "eventArea"
    ).innerText = text;

}

