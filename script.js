// =========================
// Couple Adventure
// script.js
// =========================


// =======================================
// 보물 목록
// =======================================

const treasuresList = [

    "🐱<br>고양이",
    "❤️<br>하트",
    "🌼<br>꽃",
    "🚲<br>자전거",
    "🐶<br>강아지",
    "🐞<br>곤충",
    "🍎<br>사과",
    "⭐<br>별",
    "📮<br>우체통",
    "🦋<br>나비",
    "☁️<br>구름",
    "🚗<br>자동차",
    "🐦<br>새",
    "🎈<br>풍선",
    "📷<br>카메라"
"👁️<br>눈"
"🎀<br>리본"
"🟡<br>노란색"
"⚪<br>흰색"
"⚫<br>검은색"
"🕳️<br>구멍"
"🌳<br>나무"
"🪑<br>의자"
"🧸<br>인형"
"☕<br>커피"

];


// =======================================
// 보물이 들어갈 칸
// =======================================

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


// =======================================
// 이동 순서
// =======================================

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


// =======================================
// 플레이어
// =======================================

const players = {

    junu: {
        name: "💙 주누",
        position: 0,
        icon: "💙",
        heart: 3,
        heartRecovered: false
    },

    hing: {
        name: "🩷 힝이",
        position: 0,
        icon: "🩷",
        heart: 3,
        heartRecovered: false
    }

};


let currentPlayer = null;

let gameOver = false;

let diceRolling = false;


// =======================================
// 배열 섞기
// =======================================

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
            [array[j], array[i]];

    }

}


// =======================================
// 보물 생성
// =======================================

function generateTreasures() {

    let temp = [...treasuresList];

    shuffle(temp);


    treasureCells.forEach((cell, index) => {

        const box =
            document.getElementById(cell);

        if (box) {

            box.innerHTML = temp[index];

        }

    });


    // 보물 소유 초기화

    if (typeof treasureMap !== "undefined") {

        for (let key in treasureMap) {

            treasureMap[key] = null;

        }

    }


    // 땅 색 초기화

    treasureCells.forEach(cell => {

        const box =
            document.getElementById(cell);

        if (box) {

            box.classList.remove(
                "owner-junu",
                "owner-hing"
            );

        }

    });


    const eventArea =
        document.getElementById("eventArea");

    if (eventArea) {

        eventArea.innerText =
            "✨ 새로운 보물이 배치되었습니다!";

    }

}


// =======================================
// RESET
// =======================================

function resetGame() {

    players.junu.position = 0;
    players.hing.position = 0;


    players.junu.heart = 3;
    players.hing.heart = 3;


    players.junu.heartRecovered = false;
    players.hing.heartRecovered = false;


    currentPlayer = null;

    gameOver = false;

    diceRolling = false;


    updateHeart("junu");
    updateHeart("hing");


    // 기존 말 삭제

    document.querySelectorAll(".piece")
        .forEach(piece => {
            piece.remove();
        });


    // 땅 색 초기화

    treasureCells.forEach(cell => {

        const box =
            document.getElementById(cell);

        if (box) {

            box.classList.remove(
                "owner-junu",
                "owner-hing"
            );

        }

    });


    // 플레이어 선택 화면

    const playerSelect =
        document.getElementById("playerSelect");

    if (playerSelect) {

        playerSelect.style.display = "block";

    }


    const turnText =
        document.getElementById("turnText");

    if (turnText) {

        turnText.innerText = "주누";

    }


    const dice =
        document.getElementById("dice");

    if (dice) {

        dice.innerText = "🎲";

    }


    const diceNumber =
        document.getElementById("diceNumber");

    if (diceNumber) {

        diceNumber.innerText = "-";

    }


    showEvent(
        "게임을 시작하려면 플레이어를 선택해주세요."
    );


    // ⭐ 보물 랜덤 재배치

    generateTreasures();

}


// =======================================
// 카드 보기
// =======================================

function showCards(player) {

    alert(
        players[player].name +
        "의 보너스카드가 아직 없습니다."
    );

}


// =======================================
// 팝업 닫기
// =======================================

function closePopup() {

    const popup =
        document.getElementById("popup");

    if (popup) {

        popup.classList.add("hidden");

    }

}


// =======================================
// 시작 플레이어 선택
// =======================================

function startGame(player) {

    if (gameOver) {

        return;

    }


    const playerSelect =
        document.getElementById("playerSelect");

    if (playerSelect) {

        playerSelect.style.display = "none";

    }


    currentPlayer = player;


    document.getElementById("turnText").innerText =
        `${players[player].name} 차례!`;


    createPlayers();


    showEvent(
        `${players[player].name}부터 시작합니다! 🎲`
    );

}


// =======================================
// 말 생성
// =======================================

function createPlayers() {

    document.querySelectorAll(".piece")
        .forEach(piece => {
            piece.remove();
        });


    for (let p in players) {

        const piece =
            document.createElement("div");

        piece.className = "piece";

        piece.id = p;

        piece.innerText =
            players[p].icon;


        const cell =
            document.getElementById(
                boardCells[players[p].position]
            );


        if (cell) {

            cell.appendChild(piece);

        }

    }

}


// =======================================
// 주사위
// =======================================

const diceFaces = [

    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅"

];


// =======================================
// 주사위 굴리기
// =======================================

function rollDice() {

    if (gameOver) {

        alert(
            "게임이 종료되었습니다. RESET을 눌러주세요!"
        );

        return;

    }


    if (!currentPlayer) {

        alert(
            "먼저 플레이어를 선택해주세요!"
        );

        return;

    }


    if (diceRolling) {

        return;

    }


    diceRolling = true;


    const dice =
        document.getElementById("dice");

    const diceNumber =
        document.getElementById("diceNumber");


    let count = 0;


    const rolling =
        setInterval(() => {

            dice.innerText =
                diceFaces[
                    Math.floor(Math.random() * 6)
                ];


            count++;


            if (count >= 8) {

                clearInterval(rolling);


                const result =
                    Math.floor(Math.random() * 6) + 1;


                dice.innerText =
                    diceFaces[result - 1];


                diceNumber.innerText =
                    result;


                movePlayer(
                    currentPlayer,
                    result
                );

            }

        }, 100);

}


// =======================================
// 말 이동
// =======================================

async function movePlayer(player, step) {

    const piece =
        document.getElementById(player);


    if (!piece) {

        diceRolling = false;

        return;

    }


    for (let i = 0; i < step; i++) {

        players[player].position++;


        if (
            players[player].position >=
            boardCells.length
        ) {

            players[player].position = 0;

        }


        const next =
            document.getElementById(
                boardCells[
                    players[player].position
                ]
            );


        if (next) {

            next.appendChild(piece);

        }


        await wait(300);

    }


    const currentCell =
        boardCells[
            players[player].position
        ];


    // ===================================
    // 보너스 카드
    // ===================================

    if (
        currentCell === "bonus" ||
        currentCell === "bonus2"
    ) {

        drawBonusCard(player);

        diceRolling = false;

        return;

    }


    // ===================================
    // 쉼터
    // ===================================

    if (currentCell === "rest") {

        addHeart(player);

    }


    // ===================================
    // 보물 확인
    // ===================================

    if (typeof checkTreasure === "function") {

        checkTreasure(player);

    }


    diceRolling = false;


    // 다음 차례

    nextTurn();

}


// =======================================
// 이동 대기
// =======================================

function wait(ms) {

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );

}


// =======================================
// 턴 변경
// =======================================

function nextTurn() {

    if (gameOver) {

        return;

    }


    if (currentPlayer === "junu") {

        currentPlayer = "hing";

    }
    else {

        currentPlayer = "junu";

    }


    document.getElementById("turnText").innerText =
        `${players[currentPlayer].name} 차례!`;

}

// =======================================
// 하트 추가
// =======================================

function addHeart(player) {

    // 이미 하트가 3개라면 추가하지 않음
    if (players[player].heart >= 3) {

        showEvent(
            `${players[player].name}은(는) 이미 풀하트이므로 하트가 추가되지 않습니다. ❤️`
        );

        return;

    }


    // 하트 +1
    players[player].heart++;


    // 화면의 하트 개수 업데이트
    updateHeart(player);


    showEvent(
        `❤️ ${players[player].name}의 하트가 1개 추가되었어요!`
    );

}

// =======================================
// 하트 표시
// =======================================

function updateHeart(player) {

    const heartBox =
        document.getElementById(
            player + "Heart"
        );


    if (!heartBox) {

        return;

    }


    let icon;


    if (player === "junu") {

        icon = "💙";

    }
    else {

        icon = "🩷";

    }


    heartBox.innerText =
        icon.repeat(
            Math.max(0, players[player].heart)
        );

}


// =======================================
// 이벤트 표시
// =======================================

function showEvent(text) {

    const eventArea =
        document.getElementById("eventArea");


    if (eventArea) {

        eventArea.innerText = text;

    }

}


// =======================================
// 보너스 카드
// =======================================

const bonusCards = [

    "땅뺏기",
    "꽝",
    "+❤️",
    "출발로 바로가기",
    "원하는 곳으로 바로가기"

];


// =======================================
// 보너스 카드 뽑기
// =======================================

function drawBonusCard(player) {

    const card =
        bonusCards[
            Math.floor(
                Math.random() *
                bonusCards.length
            )
        ];


    const popup =
        document.getElementById("popup");

    const popupTitle =
        document.getElementById("popupTitle");

    const popupBody =
        document.getElementById("popupBody");


    popupTitle.innerText =
        "🎴 보너스 카드!";


    // ===============================
    // 땅뺏기
    // ===============================

    if (card === "땅뺏기") {

        const opponent =
            player === "junu"
                ? "hing"
                : "junu";


        let lands = [];


        if (typeof treasureMap !== "undefined") {

            for (let cell in treasureMap) {

                if (
                    treasureMap[cell] === opponent
                ) {

                    lands.push(cell);

                }

            }

        }


        if (lands.length === 0) {

            popupBody.innerHTML = `

                <p>🎴 땅뺏기 카드!</p>

                <br>

                <p>
                상대방의 땅이 없어요!
                </p>

                <br>

                <p>
                꽝과 동일하게 처리됩니다. 😢
                </p>

                <br>

                <button onclick="closeBonusTurn()">
                    확인
                </button>

            `;

        }
        else {

            let buttons = "";


            lands.forEach(cell => {

                buttons += `

                    <button
                        onclick="
                        stealLand(
                            '${player}',
                            '${cell}'
                        )
                        "
                    >
                        ${getCellName(cell)}
                    </button>

                `;

            });


            popupBody.innerHTML = `

                <p>
                상대방의 땅 하나를 뺏을 수 있어요!
                </p>

                <br>

                ${buttons}

            `;

        }

    }


    // ===============================
    // 꽝
    // ===============================

    else if (card === "꽝") {

        popupBody.innerHTML = `

            <div style="font-size:50px;">
                😢
            </div>

            <h3>
                꽝!
            </h3>

            <p>
                아무 효과 없이 지나갑니다.
            </p>

            <button onclick="closeBonusTurn()">
                확인
            </button>

        `;

    }


    // ===============================
    // + 하트
    // ===============================

    else if (card === "+❤️") {

        addHeart(player);


        popupBody.innerHTML = `

            <div style="font-size:50px;">
                ❤️
            </div>

            <h3>
                하트 +1!
            </h3>

            <p>
                생명이 하나 추가되었어요!
            </p>

            <button onclick="closeBonusTurn()">
                확인
            </button>

        `;

    }


    // ===============================
    // 출발로 바로가기
    // ===============================

    else if (card === "출발로 바로가기") {

        popupBody.innerHTML = `

            <div style="font-size:45px;">
                🏁
            </div>

            <p>
                출발 칸으로 바로 이동합니다!
            </p>

            <button onclick="
                bonusGoStart('${player}')
            ">
                이동하기
            </button>

        `;

    }


    // ===============================
    // 원하는 곳으로 바로가기
    // ===============================

    else if (
        card === "원하는 곳으로 바로가기"
    ) {

        let buttons = "";


        boardCells.forEach(cell => {

            if (cell !== "start") {

                buttons += `

                    <button
                        onclick="
                        bonusGoTo(
                            '${player}',
                            '${cell}'
                        )
                        "
                    >
                        ${getCellName(cell)}
                    </button>

                `;

            }

        });


        popupBody.innerHTML = `

            <p>
            원하는 칸을 골라주세요! 💕
            </p>

            <br>

            ${buttons}

        `;

    }


    popup.classList.remove("hidden");

}


// =======================================
// 땅 이름
// =======================================

function getCellName(cell) {

    const names = {

        start: "출발 🏁",

        bonus: "보너스 카드 🎴",

        bonus2: "보너스 카드 🎴",

        rest: "쉼터 ❤️"

    };


    if (names[cell]) {

        return names[cell];

    }


    const land =
        document.getElementById(cell);


    if (land) {

        return land.innerText;

    }


    return cell;

}


// =======================================
// 땅 뺏기
// =======================================

function stealLand(player, cell) {

    if (
        typeof treasureMap !== "undefined"
    ) {

        treasureMap[cell] = player;

    }


    const land =
        document.getElementById(cell);


    if (land) {

        land.classList.remove(
            "owner-junu",
            "owner-hing"
        );


        land.classList.add(
            "owner-" + player
        );

    }


    closePopup();


    showEvent(
        `🎉 ${players[player].name}이(가) 상대방의 땅을 뺏었어요!`
    );


    nextTurn();

}


// =======================================
// 보너스 카드 종료
// =======================================

function closeBonusTurn() {

    closePopup();

    nextTurn();

}


// =======================================
// 출발로 이동
// =======================================

function bonusGoStart(player) {

    players[player].position = 0;


    const piece =
        document.getElementById(player);


    const start =
        document.getElementById("start");


    if (piece && start) {

        start.appendChild(piece);

    }


    closePopup();


    showEvent(
        `${players[player].name}이(가) 출발로 이동했어요! 🏁`
    );


    nextTurn();

}


// =======================================
// 원하는 곳으로 이동
// =======================================

function bonusGoTo(player, cell) {

    const index =
        boardCells.indexOf(cell);


    if (index === -1) {

        return;

    }


    players[player].position = index;


    const piece =
        document.getElementById(player);


    const destination =
        document.getElementById(cell);


    if (piece && destination) {

        destination.appendChild(piece);

    }


    closePopup();


    showEvent(
        `${players[player].name}이(가) ${getCellName(cell)}으로 이동했어요! 💕`
    );


    nextTurn();

}


// =======================================
// 페이지가 열릴 때
// =======================================

window.onload = function() {

    generateTreasures();

    updateHeart("junu");

    updateHeart("hing");

};