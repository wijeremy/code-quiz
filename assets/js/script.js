var display = document.getElementById("display");
var start = document.getElementById("start");
var timeEl = document.getElementById("time");
var isWin = false;
var secondsLeft = 100000;
var frameRate = 20;
var frameRateInit = frameRate;
var question = display.children[1];
var barrel1 = document.getElementById("barrel1");
var barrel2 = document.getElementById("barrel2");
var barrel3 = document.getElementById("barrel3");
var barrel4 = document.getElementById("barrel4");
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
}

var monkey = document.createElement("img");
monkey.setAttribute("src", "./assets/media/monkey.png");
monkey.setAttribute("alt", "what a silly little monkey");
monkey.setAttribute("id", "monkey")
barrel1.appendChild(monkey);

monkey.setAttribute("class", "up")


function runGame(){
    barrel1.removeEventListener("click", runGame);
    //start the timer
    setTime();
    //first we randomize which questions show first
    var listShuffled = shuffleArray(jsQuestions);
    //we'll start our current question at the beginning of our question array
    var currentQuestion = 0;
    //before we get to displaying, let's turn our buttons on to game mode
    function checkTrue() {
        if (this.getAttribute("data-key") == "true"){
            console.log("hurray");
            currentQuestion++;
            console.log(currentQuestion);
            questionDisplay();
        } else if (this.getAttribute("data-key") == "false"){
            console.log("oh no!")
            var timeOut = 10
            var timeOutEl = document.createElement("h2");
            timeOutEl.textContent = "";
            question.appendChild(timeOutEl);
            for (var i = 0; i < document.getElementsByClassName("answerBtn").length; i++) {
                document.getElementsByClassName("answerBtn")[i].disabled = true;
            }
            function downTime() {
                btnOff();
                var timerInterval = setInterval(function() {
                    timeOut--;
                    if (timeOut < 4 && timeOut > 0) {
                        timeOutEl.textContent = timeOut;
                    } else if (timeOut == 0) {
                        clearInterval(timerInterval);
                        currentQuestion++;
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
            document.getElementById("barrels").children[i].addEventListener("click", checkTrue)
        };
    };
    btnOn();
    function btnOff(){
        for (var i = 0; i < 4; i++) {
            document.getElementById("barrels").children[i].removeEventListener("click", checkTrue)
        };
    };

    //this function displays our current question
    function questionDisplay(){
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
            var answer = document.getElementById("barrels").children[i];
            answer.children[1].textContent = randAnswerArray[i][0];
            answer.setAttribute("data-key", randAnswerArray[i][1]);
        };
    };       
    questionDisplay();
};


function setTime() {
    var timerInterval = setInterval(function() {
        frameRate--;
        if (frameRate == 0) {
            frameRate = frameRateInit 
            secondsLeft--;
            timeEl.textContent = secondsLeft + " seconds left.";
            if (isWin) {
                clearInterval(timerInterval);
                youWin();
            };  
            if(secondsLeft === 0){
                clearInterval(timerInterval);
                display.textContent = "YOU LOSE"
                display.setAttribute("style", "fontSize:50px, color:red")
                getReset();
            };
        }
    }, 1000/frameRate);
};

function youWin() {
    question.textContent = "Final Score: " + secondsLeft;
    getReset();
};

function getReset() {
    var resetBtn = document.createElement("button");
    resetBtn.textContent = "RESET";
    display.appendChild(resetBtn)
    resetBtn.addEventListener("click", function(){
        location.reload();
    })
};

function init() {
    barrel1.children[1].textContent = "start";
    barrel1.addEventListener("click", runGame);
}
init();
// start.addEventListener("click", runGame);