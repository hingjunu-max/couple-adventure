// =======================================
// Part 3 : 보물 획득 + 미션
// =======================================


// 보물 소유 정보

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





// 도착 후 보물 확인

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



    // 아직 아무도 없는 땅

    if(
        treasureMap[currentCell] === null
    ){

        showTreasurePopup(
            player,
            currentCell
        );

    }



    // 내가 가진 땅

    else if(
        treasureMap[currentCell] === player
    ){

        showEvent(
            "내 보물이에요! 💕"
        );

    }



    // 상대방 보물

    else{

        startMission(
            player,
            currentCell
        );

    }


}







// 보물 발견 팝업

function showTreasurePopup(player,cell){


    const popup =
    document.getElementById("popup");


    const popupTitle =
    document.getElementById("popupTitle");


    const popupBody =
    document.getElementById("popupBody");



    popupTitle.innerText =
    "✨ 보물 발견!";

    popupBody.innerHTML =

    `
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

console.log("보물 팝업 실행됨");
console.log(popup);
console.log(popupBody.innerHTML);

}







// 보물 가져가기

function takeTreasure(player,cell){


    treasureMap[cell] = player;



    const land =
    document.getElementById(cell);



    land.classList.add(
        "owner-" + player
    );



    closePopup();



    showEvent(
        `${players[player].name}이(가)
        보물을 획득했어요! 💎`
    );


}







// 보물 지키기 미션

function startMission(player,cell){


    const popup =
    document.getElementById("popup");


    const popupTitle =
    document.getElementById("popupTitle");


    const popupBody =
    document.getElementById("popupBody");



    popupTitle.innerText =
    "⚔️ 보물 지키기 미션!";


    popupBody.innerHTML =

`
<p>
앗! 다른 사람이 발견한 보물이에요!
</p>

<br>

<p>
💕 미션 성공 시 지나갈 수 있어요!
</p>

<br>

<h3>
💬 서로에게 좋아하는 음식 말하기
</h3>

<br>

<button onclick="
completeMission('${player}')
">
미션 완료!
</button>

`;



    popup.classList.remove("hidden");


}






// 미션 결과

function completeMission(player){


    const success =
    Math.random() > 0.4;



    // 현재 위치 확인

    const cell =
    boardCells[
        players[player].position
    ];



    if(success){


        // 땅 빼앗기

        treasureMap[cell] = player;



        const land =
        document.getElementById(cell);



        // 기존 소유 색 제거

        land.classList.remove(
            "owner-junu",
            "owner-hing"
        );



        // 새 주인 색 적용

        land.classList.add(
            "owner-" + player
        );



        showEvent(
        `🎉 미션 성공!
        ${players[player].name}이(가)
        보물을 빼앗았어요! 💎`
        );


    }


    else{


        players[player].heart--;


        updateHeart(player);



        showEvent(
        "😢 미션 실패! ❤️ -1"
        );


    }



    closePopup();


}






// 하트 업데이트

function updateHeart(player){


    let heartIcon;


    if(player==="junu"){

        heartIcon="💙";

    }
    else{

        heartIcon="🩷";

    }



    document.getElementById(
        player+"Heart"
    ).innerText =
    heartIcon.repeat(
        players[player].heart
    );


}