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

function runGame(){
    //reset display
    display.innerHTML = "";
    //display question
    var question = document.createElement("h2");
    question.textContent = questionWheel[queue][0];
    display.appendChild(question);
    //display answer buttons; we start at index 1 because index 0 is the question
    for (var i = 1; i < questionWheel[queue].length; i++) {
        var answer = document.createElement("button");
        answer.textContent = questionWheel[queue][i][0];
        answer.setAttribute("data-key", questionWheel[queue][i][1]);
        display.appendChild(answer);
        answer.addEventListener("click", function(){
            if (this.getAttribute("data-key") == "true"){
                console.log("hurray");
            }
        });
    } 
};

start.addEventListener("click", runGame);