const Divs = document.querySelectorAll(".DIV");
const Changers = document.querySelectorAll(".DIV button[data-target]");

Divs.forEach(div => {
    div.style.display = div.id === "START" ? "block" : "none";
});

Changers.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "READYButton") return;

        Divs.forEach(div => {
            div.style.display = div.id === button.dataset.target ? "block" : "none";
        });
    });
});

async function Wait(Time) {
    await new Promise(resolve => setTimeout(resolve, Time));
}

/* 
좋아하는 캐릭터만 넣었어요...만약 그대의 캐릭터가 없다면 유감("누구누구 있나?"는 아래 Character 요소를 확인해주세요)

1~2 최하 3~4 하 5~6 중 7~8 상 9~10 최상, 10부터 특화 성질 
지능 신체 취미 인성........스탯 값 이상만 나오면 통과

팁: 테스트 해보면서 안 사실인데..지능 버튼과 운동버튼은 각각 누를때마다 +2지능, -운동 (또는 +2운동, -지능) 로 값이
변하는데요..이를 이용하여 지능 운동 값 복사가 가능합니다. 그러니 자유버튼은 웬만하면
취미찾기나 인성올리기 용으로 사용하시구 운동, 지능은 어느정도 값이 되면 그냥 복사하세요ㅋ
*/

const BasicState = {
    IQ: 2,
    Exer: 2,
    Hobby: ["nil", 2],
    Humanity: 2
};

const Hobbys = [
    "BaseBall", "Origami", "Taekwondo", "Hockey", "Discovery", "Punch"
];

const MainSheet = {
    Idle:[
        "Image/Char/1.png",
        "Image/Char/2.png"
    ],
    Option:[
        "Image/Char/5-1.png",
        "Image/Char/5-2.png",
    ],
    Happy: "Image/Char/4.png"
};

const Character = {
    Thunder: {
        Idle: [
            "Image/Char/T1.png",
            "Image/Char/T2.png"
        ],
        Happy: "Image/Char/T3.png",
        State: [3, 10, 10, 5],
        Hobby: "BaseBall"
    },
    Heater: {
        Idle: [
            "Image/Char/H1.png",
            "Image/Char/H2.png"
        ],
        Happy: "Image/Char/H3.png",
        State: [10, 1, 10, 3],
        Hobby: "Discovery"
    },
    Paper: {
        Idle: [
            "Image/Char/P1.png",
            "Image/Char/P2.png"
        ],
        Happy: "Image/Char/P3.png",
        State: [7, 1, 10, 1],
        Hobby: "Origami"
    },
    Ddangeon: {
        Idle: [
            "Image/Char/D1.png",
            "Image/Char/D2.png"
        ],
        Happy: "Image/Char/D3.png",
        State: [3, 10, 10, 5],
        Hobby: "Taekwondo"
    },
    YoungGirl: {
        Idle: [
            "Image/Char/Y1.png",
            "Image/Char/Y2.png"
        ],
        Happy: "Image/Char/Y3.png",
        State: [3, 10, 10, 5],
        Hobby: "Hockey"
    },
    Bastard: {
        Idle: [
            "Image/Char/B1.png",
            "Image/Char/B2.png"
        ],
        Happy: "Image/Char/B3.png",
        State: [0, 10, 10, 4],
        Hobby: "Punch"
    }
};

let Selected_Character = MainSheet;

document.body.style.fontFamily = "궁서체";

/*시작&준비화면*/
const CollectionButton = document.getElementById("STARTBUTTONcollection");
const BIGText = document.getElementById("STARTtext");
CollectionButton.onclick = async () => {
    BIGText.textContent = "도감까지 만들면 죽을까봐 못 만듦ㅈㅅ(캐릭터 조합법: F12 누르고 Sources 눌러 game.js 문서 const Character 안쪽에 나옴ㅎㅇㅌ)"
};

const ReadyInput = document.getElementById("READYInput");
const ReadyButton = document.getElementById("READYButton");
const ReadyText = document.getElementById("READYText");

const BUB_TEX = document.getElementById("BubbleText_Text");

let PlayerName = "no name";
let cool = false;

ReadyButton.onclick = async () => {
    if (ReadyInput.value.trim().length !== 0) {
        PlayerName = ReadyInput.value;
        BUB_TEX.textContent = `안녕, ${PlayerName}.`;

        Divs.forEach(div => {
            div.style.display = div.id === "MAIN" ? "block" : "none";
        });
    } else {
        if (cool) return;

        ReadyText.textContent = "한 글자 이상 적어주세요ㅎㅎ";
        ReadyInput.value = "";
        cool = true;

        await Wait(2000);
        if (ReadyText.textContent == "한 글자 이상 적어주세요ㅎㅎ") {
              ReadyText.textContent = "이름을 적어주세요";
        }
        cool = false;
    }
};

/*메인화면*/

const CHARACTER = document.getElementById("CHARACTER");
const EatButton = document.getElementById("MAIN-L1");

const Status_Text = document.getElementById("Satus_Text");

function UpdateStatus() {
    Status_Text.textContent =
        `지능: ${BasicState.IQ}, 신체능력: ${BasicState.Exer}, 취미(${BasicState.Hobby[0]}): ${BasicState.Hobby[1]}, 인성: ${BasicState.Humanity}`;
}

let cool_Char = false;
let Index = 0;

EatButton.onclick = async() => {
    if (cool_Char) return;

    cool_Char = true;
    CHARACTER.src = Selected_Character.Happy;

    await Wait(2000);

    CHARACTER.src = Selected_Character.Idle[Index];
    cool_Char = false;
};

/* -------------------------------------------------- */

let CanInteraction = 4;
let Day = 0;

const RandomFreeTime = [
    function() {
        BUB_TEX.textContent = "친구들이랑 같이 놀았어.(+2신체, +인성)";
        BasicState.Exer += 2;
        BasicState.Humanity += 1;

        return MainSheet.Happy
    },
    function() {
        BUB_TEX.textContent = "친구들이랑 싸웠어.(-인성)";
        BasicState.Humanity -= 1;

        return MainSheet.Option[0]
    },
    function() {
        BUB_TEX.textContent = "힘들어 보이는 사람을 도와줬어.(+2인성)";
        BasicState.Humanity += 2;

        return MainSheet.Happy
    },
    function() {
        BUB_TEX.textContent = "공부했어.(+2지능)";
        BasicState.IQ += 2;

        return MainSheet.Happy
    },
    function() {
        BUB_TEX.textContent = "새로운 취미를 찾은 것같아.(+취미, +취미 변경)";
        BasicState.Hobby[0] = Hobbys[Math.floor(Math.random() * Hobbys.length)];
        BasicState.Hobby[1] += 1;

        return MainSheet.Happy
    },
    function() {
    BUB_TEX.textContent = "공부 중 모든 문제를 틀렸어.(-지능, -인성)";
    BasicState.Humanity -= 1;
    BasicState.IQ -= 1;

    return MainSheet.Option[1];
    },
    function() {
    BUB_TEX.textContent = "놀다가 다쳤어.(-신체)";
    BasicState.Exer -= 1;

    return MainSheet.Option[0];
    },
    function() {
    BUB_TEX.textContent = "취미에 흥미를 잃었어.(취미 수치, 취미 값 모두 초기화)";
    BasicState.Hobby[0] = "nil";
    BasicState.Hobby[1] = 0;

    return MainSheet.Option[1];
    },
    function() {
    BUB_TEX.textContent = "괴롭힘 받던 아이를 도와주고 왔어.(+2인성, +신체)";
    BasicState.Exer += 1;
    BasicState.Humanity += 2;

    return MainSheet.Happy;
    },
    function() {
    BUB_TEX.textContent = "취미 모임에 갔어.(+3취미)";
    BasicState.Hobby[1] += 2;

    return MainSheet.Happy;
    },
    function() {
    BUB_TEX.textContent = "친구랑 숙제했어(+2지능, +인성)";
    BasicState.IQ += 2;
    BasicState.Humanity += 1;

    return MainSheet.Happy;
    }
];

console.log(document.querySelectorAll(".interaction"));

document.querySelectorAll(".interaction").forEach(button => {
    button.addEventListener("click", async() => {
        if (cool_Char) return;
        CanInteraction -= 1;

        if (button.id === "MAIN-D1") {
            BasicState.IQ += 2;
            BasicState.Exer -= 1;
        } else if (button.id === "MAIN-D3") {
            BasicState.Exer += 2;
            BasicState.IQ -= 1;
        } else if (button.id === "MAIN-D2") {
            BasicState.Hobby[1] += 2;
        } else if (button.id === "MAIN-D4") {
            let Reaction = RandomFreeTime[Math.floor(Math.random() * RandomFreeTime.length)]();

            cool_Char = true;
            CHARACTER.src = Reaction;
            UpdateStatus();

            await Wait(2000);

            CHARACTER.src = Selected_Character.Idle[Index];
            cool_Char = false;
            return;
        }

        if (CanInteraction == 0) {
            Day += 1;
            CanInteraction = 4;
        }

        UpdateStatus();

        console.log(BasicState.IQ,BasicState.Exer,BasicState.Humanity, BasicState.Hobby[0], BasicState.Hobby[1]);
    });
});

/* -------------------------------------------------- */

const OKbutton = document.getElementById("MAIN-L2");
const AllButtons = document.querySelectorAll("button");
const ResultText = document.getElementById("MAINtext");

OKbutton.onclick = () => {
    const Found = Object.values(Character).find(value =>
        value.State[0] <= BasicState.IQ &&
        value.State[1] <= BasicState.Exer &&
        value.State[2] <= BasicState.Hobby[1] &&
        value.State[3] <= BasicState.Humanity &&
        value.Hobby === BasicState.Hobby[0]
    );

    if (Found) {
        Selected_Character = Found;
        ResultText.textContent = "ㅊㅋ!";

        AllButtons.forEach(But => {
            if (But.id === "MAIN-L1") {
                return;
            }
            But.style.display = "none";
            BUB_TEX.textContent = "";
        });
    } else {
        BUB_TEX.textContent = `딱히 될 수 있는 게 없어서 그냥 이대로 살기로 했어, 키워줘서 고마워 ${PlayerName}.`;
        CHARACTER.src = Selected_Character.Happy;
        cool_Char = true;

        ResultText.textContent = "다른 캐릭터를 원하시면 새로고침 눌러 다시 키워보세요ㅎㅎ";

        AllButtons.forEach(But => {
            But.style.display = "none";
        });
    }
};
setInterval(function() {
    if (cool_Char) return;

    Index = (Index + 1) % Selected_Character.Idle.length;
    CHARACTER.src = Selected_Character.Idle[Index];
}, 1000);