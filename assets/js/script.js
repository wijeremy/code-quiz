var display = document.getElementById("display");
var start = document.getElementById("start");

var timeLeft = 30;
var queue = 0;

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

var myArray = ["a", "b", "c", "d", "e", "f"];

var myNewArray = shuffleArray(myArray);

console.log(myNewArray);

function runGame(questionList){
    //first we randomize which questions show first
    var listShuffled = shuffleArray(questionList);
    //we'll start our current question at the beginning of our question array
    var currentQuestion = 0
    //this function displays our current question
    function questionDisplay(){
        display.innerHTML = "";
        //display question
        var question = document.createElement("h2");
        question.textContent = listShuffled[currentQuestion][0];
        display.appendChild(question);
        //display answer buttons
        //first lets shuffle those possible answers
        var randAnswerArray = shuffleArray(listShuffled[currentQuestion][1])
        //then we itterate through them, displaying them as well as creating event listeners for them
        for (var i = 0; i < randAnswerArray.length; i++) {
            var answer = document.createElement("button");
            answer.textContent = randAnswerArray[i][0];
            answer.setAttribute("data-key", randAnswerArray[i][1]);
            display.appendChild(answer);
            answer.addEventListener("click", function(){
                if (this.getAttribute("data-key") == "true"){
                    console.log("hurray");
                    currentQuestion++;
                    questionDisplay()
                } else {
                    console.log("oh no!")
                    currentQuestion++;
                    questionDisplay()
                }
            });
        }
    }
    questionDisplay();
};

start.addEventListener("click", runGame(jsQuestions));