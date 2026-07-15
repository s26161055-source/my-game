// ===================================
// まちづくりゲーム main.js
// 前半①
// ===================================


// 画面要素

const screen = document.getElementById("screen");
const topArea = document.getElementById("top");

const startButton = document.getElementById("start");
const nameInput = document.getElementById("name");



// ===================================
// ゲームデータ
// ===================================


let playerName = "";

let population = 10;   // 人口
let activity = 0;      // 活気
let attraction = 0;    // 魅力度


let questionNumber = 0;



// ===================================
// 問題
// ===================================


const questions = [

{
    question:
    "若い世代に住んでもらうためには？",

    a:
    "子育て支援を充実させる",

    aData:
    [70,15,10],


    b:
    "仕事や住む場所を増やす",

    bData:
    [50,10,20]
},


{
    question:
    "地域の魅力を多くの人に知ってもらうには？",

    a:
    "SNSや動画で情報発信する",

    aData:
    [30,10,30],


    b:
    "地域イベントで交流を深める",

    bData:
    [40,25,15]
},


{
    question:
    "増えている空き家を活用するには？",

    a:
    "移住者向けに住宅化する",

    aData:
    [60,15,10],


    b:
    "管理だけして現状を維持する",

    bData:
    [-20,-15,-10]
},


{
    question:
    "観光客を増やすためには？",

    a:
    "地域の自然や文化をPRする",

    aData:
    [30,15,35],


    b:
    "大型施設を作って集客する",

    bData:
    [60,-5,20]
},


{
    question:
    "地域の特産品を広めるには？",

    a:
    "新しい商品を開発する",

    aData:
    [35,10,35],


    b:
    "昔ながらの味や伝統を守る",

    bData:
    [20,25,20]
},


{
    question:
    "高齢化が進む町を支えるには？",

    a:
    "福祉サービスを充実させる",

    aData:
    [20,15,15],


    b:
    "世代交流の場を増やす",

    bData:
    [40,35,20]
},


{
    question:
    "若者が地域に関わるには？",

    a:
    "大学と地域が協力する",

    aData:
    [40,35,20],


    b:
    "起業しやすい環境を作る",

    bData:
    [70,5,30]
},


{
    question:
    "自然を活かした町づくりとは？",

    a:
    "自然体験や観光を作る",

    aData:
    [30,15,40],


    b:
    "自然を守る活動",

    bData:
    [35,30,15]
},


{
    question:
    "商店街を元気にするには？",

    a:
    "新しい店を呼び込む",

    aData:
    [60,20,20],


    b:
    "昔からある店を支援",

    bData:
    [-30,-20,-15]
},


{
    question:
    "町のこれからに重要なのは？",

    a:
    "大きな施設をつくる",

    aData:
    [50,-5,25],


    b:
    "住民と一緒に案を考える",

    bData:
    [80,15,25]
}

];

// ===================================
// ゲーム開始
// ===================================


function startGame(){

    playerName = nameInput.value.trim();


    if(playerName === ""){

        playerName = "町長";

    }


    // 初期化

    population = 10;
    activity = 0;
    attraction = 0;

    questionNumber = 0;


    showExplanation();

}




// ボタンで開始

startButton.addEventListener(
    "click",
    startGame
);




// Enterキーで開始

nameInput.addEventListener(
    "keydown",
    function(e){

        if(e.key === "Enter"){

            startGame();

        }

    }
);






// ===================================
// 説明画面
// ===================================


function showExplanation(){


    screen.innerHTML = `

    <h1>
    町長就任！
    </h1>


    <p class="description">

    ${playerName}さんは町長に任命された！<br><br>


    あなたの選択で住みたくなる町をつくってください！

    </p>


    <button onclick="startQuestions()">

    まちづくり開始

    </button>

    `;


}







// ===================================
// ゲーム開始
// ===================================


function startQuestions(){

    showQuestion();

}






// ===================================
// ステータス表示
// ===================================


function showStatus(){


    return `

    <div class="status">

        <span>
        👨‍👩‍👧‍👦人口 ${population}/500
        </span>


        <span>
        🔥活気 ${activity}/100
        </span>


        <span>
        🌟魅力度 ${attraction}/100
        </span>


    </div>

    `;


}// ===================================
// 問題表示
// ===================================


function showQuestion(){


    const q = questions[questionNumber];


    screen.innerHTML = `

    ${showStatus()}


    <h2 class="question">

    ${questionNumber + 1}つめの課題

    </h2>


    <p class="questionText">

    ${q.question}

    </p>



    <button class="choice"
    onclick="selectAnswer(0)">

    ${q.a}

    </button>



    <button class="choice"
    onclick="selectAnswer(1)">

    ${q.b}

    </button>


    `;


}







// ===================================
// 選択後処理
// ===================================


function selectAnswer(number){


    const q = questions[questionNumber];


    let data;
    let answerText;



    if(number === 0){

        data = q.aData;

        answerText = q.a;


    }else{

        data = q.bData;

        answerText = q.b;

    }




    // 数値を保存する前の値

    const oldPopulation = population;

    const oldActivity = activity;

    const oldAttraction = attraction;



    // 数値変更

    population += data[0];

    activity += data[1];

    attraction += data[2];



    // 上限・下限

    population = Math.max(10, Math.min(500, population));

    activity = Math.max(0, Math.min(100, activity));

    attraction = Math.max(0, Math.min(100, attraction));




    // 結果表示

    screen.innerHTML = `


    ${showStatus()}



    <h2>

    あなたの選択

    </h2>



    <p class="choiceResult">

    「${answerText}」

    </p>



    <div class="statusChange">


    <p>

    👨‍👩‍👧‍👦人口　

    ${showChange(
        population - oldPopulation
    )}

    </p>



    <p>

    🔥活気　

    ${showChange(
        activity - oldActivity
    )}

    </p>



    <p>

    🌟魅力度　

    ${showChange(
        attraction - oldAttraction
    )}

    </p>



    </div>


    `;



    questionNumber++;




    // 1秒後に次へ

    setTimeout(function(){


        if(questionNumber < questions.length){


            showQuestion();


        }else{


            showResult();


        }


    },1000);



}






// ===================================
// 増減表示
// ===================================


function showChange(value){


    if(value > 0){


        return `

        <span class="plus">

        +${value}

        </span>

        `;


    }



    if(value < 0){


        return `

        <span class="minus">

        ${value}

        </span>

        `;


    }



    return `

    <span class="zero">

    ±0

    </span>

    `;


}

// ===================================
// 結果表示
// ===================================

function showResult(){

    let star = "";
    let title = "";
    let comment = "";
    let image = "";


    // エンディング判定

    if(
        population >= 450 &&
        activity >= 80 &&
        attraction >= 80
    ){

        star = "★★★★★";

        title =
        "大成功！全国から人が集まる町";

        comment =
        "あなたのまちづくりによって、人口減少を乗り越えました。活気と魅力にあふれる未来の町です！";

        image =
        `<img src="yuenchi.png" class="resultImage">`;

    }


    else if(
        population >= 350 &&
        activity >= 60 &&
        attraction >= 50
    ){

        star = "★★★★☆";

        title =
        "活気ある町";

        comment =
        "人口が増え、町ににぎわいが戻りました。さらに魅力を高めれば、もっと成長できます！";

        image =
        `<img src="shopping_syoutengai.png" class="resultImage">`;

    }


    else if(
        population >= 250 &&
        activity >= 40
    ){

        star = "★★★☆☆";

        title =
        "少し発展した町";

        comment =
        "取り組みの成果が少しずつ表れています。これからの工夫が町の未来を左右します。";

        image =
        `<img src="tatemono_jutaku.png" class="resultImage">`;

    }


    else if(
        population >= 150
    ){

        star = "★★☆☆☆";

        title =
        "まだまだ成長途中の町";

        comment =
        "課題は残っていますが、町を変えるための第一歩になりました。";

        image =
        `<img src="saigai_machi_boroboro.png" class="resultImage">`;

    }


    else{

        star = "★☆☆☆☆";

        title =
        "人口減少が止まらなかった町";

        comment =
        "人口減少を防ぐには、地域全体で協力した取り組みが必要です。";

        image =
        `<img src="kouhai_city.png" class="resultImage">`;

    }



    // 上の画像を変更

    topArea.innerHTML = "";

topArea.insertAdjacentHTML(
    "beforeend",
    image
);



    // 結果画面

    screen.innerHTML = `


    <h1 class="resultTitle">

    ${playerName}町長の結果

    </h1>


    <p class="result">


    ${star}

    <br><br>


    <strong>

    ${title}

    </strong>


    <br><br>


    ${comment}


    <br><br>


    👨‍👩‍👧‍👦人口：${population}/500

    <br>

    🔥活気：${activity}/100

    <br>

    🌟魅力度：${attraction}/100


    </p>



    <button onclick="location.reload()">

    もう一度遊ぶ

    </button>


    `;

}