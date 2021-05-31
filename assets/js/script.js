var monkey
var monkeyMake
var display = document.getElementById("display");
var start = document.getElementById("start");
var timeEl = document.getElementById("time");
var barrels = document.getElementById("barrels");
var isWin = false;
var secondsLeft = 100;
var secondsLeftInit = 100;
var frameRate = 20;
var frameRateInit = 20;
var question = display.children[1];
var barrel1 = document.getElementById("barrel1");
var barrel1Btn = barrel1.children[1];
var barrel2 = document.getElementById("barrel2");
var barrel2Btn = barrel2.children[1];
var barrel3 = document.getElementById("barrel3");
var barrel3Btn = barrel3.children[1];
var barrel4 = document.getElementById("barrel4");
var barrel4Btn = barrel4.children[1];
var jsQuestions = [
    [
        "The condition of an if statement is enclosed in ...",
        [
            ["parentheses", true],
            ["squre braces", false],
            ["curly braces", false],
            ["quotation marks", false]
        ]
    ],
    [
        "In an object, parameters are separated by ...",
        [
            ["a comma", true],
            ["a semi-colon", false],
            ["a slash", false],
            ["a line break", false]
        ]
    ],
    [
        "Which of the following is not a JavaScript data type?",
        [
            ["an array", true],
            ["a number", false],
            ["a boolean", false],
            ["a string", false]
        ]
    ],
    [
        "The method isNaN tells if something is...",
        [
            ["not a number.", true],
            ["not an integer.", false],
            ["not a negative.", false],
            ["bread.", false]
        ]
    ],
    [
        "Which keyword refers to the object from which it is called?",
        [
            ["this", true],
            ["here", false],
            ["mySelf", false],
            ["true", false]
        ]
    ],
    [
        "A function inside an object is called a...",
        [
            ["method", true],
            ["function", false],
            ["parameter", false],
            ["procedure", false]
        ]
    ],
    [
        "A variable inside an object is called a...",
        [
            ["parameter", true],
            ["method", false],
            ["sub-object", false],
            ["mutable", false]
        ]
    ],
];

function shuffleArray(array) {
    var oldArray = [];
    for (i=0;i<array.length;i++){
        oldArray.push(array[i])
    }
    var newArray = [];
    for (var i = 0; i<array.length; i++){
        var rand = Math.floor(Math.random() * (oldArray.length));
        newArray.push(oldArray[rand]);
        oldArray.splice(rand,1);
    }
    return newArray;
};

function makeMonkey(barrel) {
    monkeyMake = document.createElement("img");
    monkeyMake.setAttribute("src", "./assets/media/monkey.png");
    monkeyMake.setAttribute("alt", "what a silly little monkey");
    monkeyMake.setAttribute("id", "monkey");
    barrel.appendChild(monkeyMake);
    monkey = document.getElementById("monkey");
}

function makeCyberMonkey(barrel) {
    monkeyMake = document.createElement("img");
    monkeyMake.setAttribute("src", "./assets/media/CYBERmonkey.png");
    monkeyMake.setAttribute("alt", "what a silly little monkey");
    monkeyMake.setAttribute("id", "monkey");
    barrel.appendChild(monkeyMake);
    monkey = document.getElementById("monkey");
}

function monkeyUp() {
    monkey.setAttribute("class", "up");
}
function monkeyFly() {
    monkey.setAttribute("class", "fly");
}
function remove(element) {
    if (element.parentNode !== null){
        console.log(element)
        console.log(element.parentNode)
        element.parentNode.removeChild(element);
    }
}
function hide(element) {
    element.setAttribute("style", "display: none");
};
function show(element) {
    element.setAttribute("style", "display: flex");
};

function runGame(){
    show(barrel3Btn);
    show(barrel4Btn);
    show(timeEl);
    barrel1Btn.removeEventListener("click", highScore);
    barrel2Btn.removeEventListener("click", runGame);
    //start the timer
    setTime();
    //first we randomize which questions show first
    var listShuffled = shuffleArray(jsQuestions);
    //we'll start our current question at the beginning of our question array
    var currentQuestion = 0;
    //before we get to displaying, let's turn our buttons on to game mode
    function checkTrue() {
        for (var i = 0; i < 4; i++) {
            if (barrels.children[i].children[1].getAttribute("data-key") == "true") {
                makeCyberMonkey(barrels.children[i])
            }
        }
        if (this.getAttribute("data-key") == "true"){
            monkeyUp();
            currentQuestion++;
            console.log(currentQuestion);
            setTimeout(questionDisplay, 500);
        } else if (this.getAttribute("data-key") == "false"){
            btnOff();
            
            monkeyUp();
            var timeOut = 10
            var timeOutEl = document.createElement("h2");
            timeOutEl.setAttribute("id", "timeOut")
            timeOutEl.textContent = "";
            question.appendChild(timeOutEl);
            function downTime() {
                btnOff();
                var timerInterval = setInterval(function() {
                    timeOut--;
                    if (timeOut < 4 && timeOut > 0) {
                        timeOutEl.textContent = timeOut;
                    } else if (timeOut == 0) {
                        clearInterval(timerInterval);
                        currentQuestion++;
                        remove(document.getElementById("timeOut"))
                        btnOn();
                        questionDisplay();
                    };
    
                }, 1000);
            };
            downTime();
        };
    };
    function btnOn() {
        for (var i = 0; i < 4; i++) {
            document.getElementById("barrels").children[i].children[1].addEventListener("click", checkTrue)
        };
    };
    btnOn();
    function btnOff(){
        for (var i = 0; i < 4; i++) {
            document.getElementById("barrels").children[i].children[1].removeEventListener("click", checkTrue)
        };
    };
    
    //this function displays our current question
    function questionDisplay(){
        remove(monkey);
        if (currentQuestion == listShuffled.length){
            youWin();
            isWin = true;
            return;
        }
        //display question
        question.textContent = listShuffled[currentQuestion][0]
        //display answer buttons
        //first lets shuffle those possible answers
        var randAnswerArray = shuffleArray(listShuffled[currentQuestion][1]);
        //then we itterate through them to add text content
        for (var i = 0; i < randAnswerArray.length; i++) {
            var answer = barrels.children[i];
            answer.children[1].textContent = randAnswerArray[i][0];
            answer.children[1].setAttribute("data-key", randAnswerArray[i][1]);
            console.log(randAnswerArray[i][1]);
            if (answer.getAttribute("data-key") == "true") {
                makeCyberMonkey(answer);
            }
        };
    };       
    questionDisplay();

    function setTime() {
        var timerInterval = setInterval(function() {
            frameRate--;
            if (frameRate == 0) {
                frameRate = frameRateInit 
                secondsLeft--;
                timeEl.textContent = secondsLeft + " seconds left.";
                if (isWin) {
                    clearInterval(timerInterval);
                };  
                if(secondsLeft === 0){
                    clearInterval(timerInterval);
                    question.textContent = "YOU LOSE"
                    remove(monkey);
                    btnOff()
                    init();
                };
            }
        }, 1000/frameRate);
    };
};



function youWin() {
    question.textContent = "Final Score: " + secondsLeft;
    init();
};
function highScore(){
    window.location.href = "./high-scores.html"
}
function init() {
    hide(timeEl)
    barrel1Btn.textContent = "HIGH SCORE";
    barrel1Btn.addEventListener("click", highScore)
    barrel2Btn.textContent = "START";
    barrel2Btn.addEventListener("click", runGame);
    makeCyberMonkey(barrel2);
    monkeyUp();
    hide(barrel3Btn);
    hide(barrel4Btn);
    secondsLeft = secondsLeftInit;
}
init();