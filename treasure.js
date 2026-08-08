// =======================================
// Part 3 : 보물 획득 + 미션
// =======================================


// =======================================
// 보물 소유 정보
// =======================================

const treasureMap = {};


// 보물 칸 초기화

boardCells.forEach(cell => {

    treasureMap[cell] = null;

});


// 이벤트 칸 제외

delete treasureMap["start"];
delete treasureMap["bonus"];
delete treasureMap["bonus2"];
delete treasureMap["rest"];


// =======================================
// 보물 확인
// =======================================

function checkTreasure(player){

    const position =
        players[player].position;


    const currentCell =
        boardCells[position];


    // 이벤트 칸이면 종료

    if(
        currentCell === "start" ||
        currentCell === "bonus" ||
        currentCell === "bonus2" ||
        currentCell === "rest"
    ){

        return;

    }


    // 아무도 가지지 않은 보물

    if(
        treasureMap[currentCell] === null
    ){

        showTreasurePopup(
            player,
            currentCell
        );

    }


    // 내가 가진 보물

    else if(
        treasureMap[currentCell] === player
    ){

        showEvent(
            "내 보물이에요! 💕"
        );

    }


    // 상대방의 보물

    else{

        startMission(
            player,
            currentCell
        );

    }

}


// =======================================
// 보물 발견 팝업
// =======================================

function showTreasurePopup(player, cell){

    const popup =
        document.getElementById("popup");


    const popupTitle =
        document.getElementById("popupTitle");


    const popupBody =
        document.getElementById("popupBody");


    const land =
        document.getElementById(cell);


    const treasure =
        land.innerHTML;


    popupTitle.innerText =
        "✨ 보물 발견!";


    popupBody.innerHTML = `

        <div style="
            font-size:42px;
            margin-bottom:15px;
        ">
            ${treasure}
        </div>

        <p>
            새로운 보물을 발견했어요!
        </p>

        <br>

        <p>
            이 보물을 가져갈까요?
        </p>

        <br>

        <button onclick="
            takeTreasure('${player}','${cell}')
        ">
            가져가기 💎
        </button>

        <button onclick="
            closePopup()
        ">
            지나가기
        </button>

    `;


    popup.classList.remove("hidden");

}


// =======================================
// 보물 가져가기
// =======================================

function takeTreasure(player, cell){

    treasureMap[cell] = player;


    const land =
        document.getElementById(cell);


    land.classList.remove(
        "owner-junu",
        "owner-hing"
    );


    land.classList.add(
        "owner-" + player
    );


    closePopup();


    showEvent(
        `${players[player].name}이(가) 보물을 획득했어요! 💎`
    );
 // ⭐ 보물을 획득했으므로 빙고 확인
    checkBingo(player);

}


// =======================================
// 보물 지키기 미션
// =======================================

// 랜덤 미션 목록

const missionList = [

    "💋 볼뽀뽀 3번하기",

    "🤗 꼬옥 안아주기",

    "👏 상대 칭찬 5개 하기",

    "✌️가위바위보해서 이기기",

    "🚫 3분간 외래어 금지",

    "🔠 3분간 영어만 하기",

    "😂 1분 안에 짝꿍 웃기기",

    "🍴 짝꿍이 좋아하는 음식 이구동성 성공하기",

    "🎨 짝꿍하면 생각나는 색깔 이구동성 성공하기",

    "🤔 1~50 짝꿍이 생각한 숫자 7번내로 맞추기(업다운)"

];


// =======================================
// 다른 사람의 땅을 밟았을 때
// =======================================

function startMission(player, cell){

    const popup =
        document.getElementById("popup");


    const popupTitle =
        document.getElementById("popupTitle");


    const popupBody =
        document.getElementById("popupBody");


    // 현재 땅의 보물

    const land =
        document.getElementById(cell);


    const treasure =
        land ? land.innerHTML : "";


    // 랜덤 미션 선택

    const mission =
        missionList[
            Math.floor(
                Math.random() * missionList.length
            )
        ];


    // 제목

    popupTitle.innerText =
        "⚔️ 보물 지키기 미션!";


    // 내용

    popupBody.innerHTML =

    `
        <div style="
            font-size:32px;
            margin-bottom:15px;
        ">
            ${treasure}
        </div>


        <p>
            앗! 다른 사람이 발견한 보물이에요!
        </p>


        <br>


        <div style="
            background:#f6f6f6;
            border-radius:15px;
            padding:20px;
            margin:10px 0;
        ">

            <p style="
                font-size:18px;
                margin-bottom:10px;
            ">
                🎯 이번 미션
            </p>


            <strong style="
                font-size:22px;
                color:#0b6d94;
            ">
                ${mission}
            </strong>

        </div>


        <br>


        <p>
            미션에 성공하면 이 땅을 차지할 수 있어요! 💕
        </p>


        <br>


        <button onclick="
            missionSuccess('${player}','${cell}')
        ">
            미션 성공! 🎉
        </button>


        <button onclick="
            missionFail('${player}')
        ">
            미션 실패! 😢
        </button>

    `;


    popup.classList.remove("hidden");

}

// =======================================
// 미션 성공 → 땅 차지
// =======================================

function missionSuccess(player, cell){

    // 땅 소유자를 현재 플레이어로 변경
    treasureMap[cell] = player;


    // 땅 가져오기
    const land =
        document.getElementById(cell);


    // 기존 땅 색 제거
    land.classList.remove(
        "owner-junu",
        "owner-hing"
    );


    // 현재 플레이어 색 적용
    land.classList.add(
        "owner-" + player
    );


    // 기존 미션 팝업 닫기
    closePopup();


    // 미션 성공 문구
    showEvent(
        `🎉 미션 성공! ${players[player].name}이(가) 땅을 차지했어요! 💕`
    );


    // ⭐ 땅을 차지한 직후 빙고 확인
    checkBingo(player);


    // 빙고로 게임이 끝났다면
    // 추가 미션을 띄우지 않음
    if(gameOver){

        return;

    }


    // 다른 사람의 땅을 뺏었으므로
    // 새로운 랜덤 미션 제공
    setTimeout(() => {

        giveRandomMission(player);

    }, 400);

}

// =======================================
// 미션 실패
// =======================================

function missionFail(player){

    closePopup();


    // 하트 -1

    players[player].heart--;


    updateHeart(player);


    showEvent(
        `😢 미션 실패! ${players[player].name}의 ❤️ -1`
    );


    // 하트가 0이면 충전/게임 종료 팝업

    if(
        players[player].heart <= 0
    ){

        setTimeout(() => {

            heartZeroPopup(player);

        }, 500);

    }

}


// =======================================
// 하트가 0이 되었을 때
// =======================================

function heartZeroPopup(player){

    const popup =
        document.getElementById("popup");


    const popupTitle =
        document.getElementById("popupTitle");


    const popupBody =
        document.getElementById("popupBody");


    const winner =
        player === "junu"
            ? "hing"
            : "junu";


    popupTitle.innerText =
        "💔 하트가 모두 소진되었어요!";


    popupBody.innerHTML = `

        <p>
            ${players[player].name}의 하트가
            <br>
            모두 사라졌어요.
        </p>

        <br>

        <h2>
            🏆 ${players[winner].name} 승리!
        </h2>

        <br>

        <p>
            하트를 한 번만 충전할 수 있어요.
        </p>

        <br>

        <button onclick="
            refillHeart('${player}')
        ">
            ❤️ 하트 3개 충전
        </button>

        <button onclick="
            endGame('${winner}')
        ">
            🏁 게임 끝내기
        </button>

    `;


    popup.classList.remove("hidden");

}


// =======================================
// 하트 충전
// =======================================

function refillHeart(player){

    // 이미 충전한 경우

    if(
        players[player].heartRecovered
    ){

        closePopup();


        showEvent(
            "이미 하트를 한 번 충전했어요!"
        );


        return;

    }


    // 충전 사용 기록

    players[player].heartRecovered = true;


    // 하트 3개 충전

    players[player].heart = 3;


    updateHeart(player);


    closePopup();


    showEvent(
        `${players[player].name}의 하트가 ❤️ 3개로 충전되었어요!`
    );

}


// =======================================
// 게임 끝내기
// =======================================

function endGame(winner){

    closePopup();


    gameOver = true;

    currentPlayer = null;


    document.getElementById(
        "turnText"
    ).innerText =
        "게임 종료";


    showEvent(
        `🏆 ${players[winner].name} 승리! 게임이 끝났어요! 🎉`
    );

}


// =======================================
// 하트 표시
// =======================================

function updateHeart(player){

    let heartIcon;


    if(player === "junu"){

        heartIcon = "💙";

    }
    else{

        heartIcon = "🩷";

    }


    document.getElementById(
        player + "Heart"
    ).innerText =
        heartIcon.repeat(
            Math.max(
                0,
                players[player].heart
            )
        );

}

// =======================================
// 빙고 확인
// =======================================

// 빙고로 인정되는 4개의 줄
const bingoLines = [

    // 위쪽
    ["c9", "c8", "c7"],

    // 오른쪽
    ["c6", "c5", "c4"],

    // 아래쪽
    ["c1", "c2", "c3"],

    // 왼쪽
    ["c10", "c11", "c12"]

];


// =======================================
// 플레이어의 빙고 줄 확인
// =======================================

function checkBingo(player) {

    let bingoCount = 0;


    // 각각의 줄이 모두 자신의 땅인지 확인
    bingoLines.forEach(line => {

        const completed = line.every(cell => {

            return treasureMap[cell] === player;

        });


        if (completed) {

            bingoCount++;

        }

    });


    // 2줄 이상 완성하면 빙고 승리
    if (bingoCount >= 2) {

        bingoWin(player);

        return true;

    }


    return false;

}


// =======================================
// 빙고 승리 팝업
// =======================================

function bingoWin(player) {

    // 이미 게임이 끝났다면 실행하지 않음
    if (gameOver) {

        return;

    }


    // 게임 종료 상태
    gameOver = true;

    currentPlayer = null;


    // 팝업 가져오기
    const popup =
        document.getElementById("popup");


    const popupTitle =
        document.getElementById("popupTitle");


    const popupBody =
        document.getElementById("popupBody");


    // 팝업 제목
    popupTitle.innerText =
        "🎉 빙고 완성! 🎉";


    // 팝업 내용
    popupBody.innerHTML =

    `
        <div style="
            font-size:50px;
            margin-bottom:15px;
        ">
            🏆💕
        </div>


        <h2>
            ${players[player].name}
        </h2>


        <p>
            빙고를 2줄 완성했어요!
        </p>


        <br>


        <p>
            🎊 ${players[player].name} 승리! 🎊
        </p>


        <br>


        <button onclick="endBingoGame()">
            🏁 게임 끝내기
        </button>
    `;


    // ⭐ 팝업 표시
    popup.classList.remove("hidden");


    // 현재 차례 표시
    document.getElementById(
        "turnText"
    ).innerText =
        "게임 종료";


    // 보드 아래 이벤트 문구
    showEvent(
        `🏆 ${players[player].name}이(가) 빙고 2줄을 완성했어요!`
    );

}


// =======================================
// 빙고 게임 종료
// =======================================

function endBingoGame() {

    // 팝업 닫기
    closePopup();


    // 게임 종료 상태 유지
    gameOver = true;

    currentPlayer = null;


    // 차례 표시
    document.getElementById(
        "turnText"
    ).innerText =
        "게임 종료";


    // 이벤트 문구
    showEvent(
        "🏆 빙고 게임이 종료되었습니다!"
    );

}