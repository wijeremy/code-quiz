var display = document.getElementById("display");
var start = document.getElementById("start");

var timeLeft = 30;

const question1 = [
    "The condition of an if statement is enclosed in ...",
    ["squre braces", false],
    ["curly braces", false],
    ["parentheses", true],
    ["quotation marks", false]
];

const question2 = [
    "In an object, parameters are separated by ...",
    ["a comma", true],
    ["a semi-colon", false],
    ["a slash", false],
    ["a line break", false],
];

function runGame(){
    display.innerHTML = "";
    //display question
    var question = document.createElement("h2");
    question.textContent = question1[0];
    display.appendChild(question);
    //display answer buttons
    for (var i = 1; i < question1.length; i++) {
        var answer = document.createElement("button");
        answer.textContent = question1[i][0];
        answer.setAttribute("data-key", question1[i][1]);
        display.appendChild(answer);
        answer.addEventListener("click", function(){
            console.log(this.getAttribute("data-key"));
            if (this.getAttribute("data-key") == "true"){
                console.log("you win")
            }
        });
    } 
};

start.addEventListener("click", runGame);