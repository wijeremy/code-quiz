var display = document.getElementById("display");
var start = document.getElementById("start");

var timeLeft = 30;
var queue = 0;

var questionWheel = [
    [
        "The condition of an if statement is enclosed in ...",
        ["squre braces", false],
        ["curly braces", false],
        ["parentheses", true],
        ["quotation marks", false]
    ],
    [
        "In an object, parameters are separated by ...",
        ["a comma", true],
        ["a semi-colon", false],
        ["a slash", false],
        ["a line break", false],
    ]
];

var humanQuestions = [
    [
        "1 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "2 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "3 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "4 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "5 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "6 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "7 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "8 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "9 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "10 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "11 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "12 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "13 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "14 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "15 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "16 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "17 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "18 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ],
    [
        "19 is a question?",
        [
            ["haha yes", true],
            ["fools rush in", false],
            ["where wise men", false],
            ["never go", false]
        ]
    ]
]

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

function runGame(){
    function somefunction(questionList){
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
    somefunction(humanQuestions);
};

start.addEventListener("click", runGame);