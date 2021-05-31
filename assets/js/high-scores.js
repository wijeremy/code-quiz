var localBoard = localStorage.getItem("board");
var isWin = localStorage.getItem("isWin");
var score = localStorage.getItem("score");
var playAgain = document.getElementById("playAgain");
var reset = document.getElementById("reset");
console.log(isWin);
console.log(score);
var scoreBoard = [
    ["ver", 3],
    ["abc", 20],
    ["xxd", 18],
    ["qwe", 17],
    ["jys", 16],
    ["sdf", 15],
    ["nfw", 14],
    ["nrt", 7],
    ["gbu", 12],
    ["foo", 11],
]

playAgain.addEventListener("click", function(){
    window.location.href = "./index.html"
})

reset.addEventListener("click", function(){
    var tempArray = sortArray(scoreBoard);
    localStorage.setItem("board", JSON.stringify(tempArray));
    location.reload();
})

if (localBoard == null) {
    var tempArray = sortArray(scoreBoard);
    console.log(tempArray)
    localStorage.setItem("board", JSON.stringify(tempArray));
}

console.log(JSON.parse(localBoard));

function sortArray(array) {
    var newArray = [];
    var tempScore = [];
    for (var i=0; i < array.length; i++) {
        if (newArray.length == 0){
            tempScore = [];
            tempScore.push(array[i][0]);
            tempScore.push(parseInt(array[i][1]));
            newArray.push(tempScore);
        }else {
            for (var j=0; j < newArray.length; j++) {
                if (array[i][1] >= newArray[j][1]) {
                    tempScore = [];
                    tempScore.push(array[i][0]);
                    tempScore.push(parseInt(array[i][1]));
                    newArray.splice(j,0,tempScore);
                    break;
                } else if (j == newArray.length - 1) {
                    tempScore = [];
                    tempScore.push(array[i][0]);
                    tempScore.push(parseInt(array[i][1]));
                    newArray.push(tempScore);
                    break;
                }
            };
        };
    };
    return newArray;
};

function numbify(array) {
    var tempArray = [];
    var tempScore = [];
    for (var i = 0; i<array.length; i++) {
        tempScore = [];
        tempScore.push(array[i][0]);
        tempScore.push(parseInt(array[i][1]));
        tempArray.push(tempScore);
    };
    return tempArray;
};

function newHighScore(score, board) {
    var tempScore = [];
    for (var i = 0; i < board.length; i++) {
        if (score[1] >= board[i][1]) {
            tempScore = []
            tempScore.push(board[i][0]);
            tempScore.push(parseInt(board[i][1]));
            board.pop();
            board.splice(i,0,score);
            break;
        };
    };
    return board;
}

function setNewHighScore() {
    if (isWin == "true") {
        var tempScore = []
        var tempBoard = []
        tempScore = JSON.parse(score)
        tempBoard = JSON.parse(localBoard)
        var newBoard = newHighScore(tempScore, tempBoard);
        localStorage.setItem("board", JSON.stringify(newBoard));
        console.log("new high score")
        localStorage.setItem("isWin", false)
        location.reload();
    };
};
setNewHighScore();
console.log(document.getElementById("board"))
console.log(document.getElementById("board").children[1].children[0].children[1])
function renderBoard(array) {
    var tempArray = JSON.parse(array)
    for (var i = 0; i < tempArray.length; i++) {
        var nameSlot = document.getElementById("board").children[1].children[i].children[1]
        var scoreSlot = document.getElementById("board").children[1].children[i].children[2]
        var name = tempArray[i][0]
        var score = tempArray[i][1]
        nameSlot.textContent = name;
        scoreSlot.textContent = score;
    }
}

renderBoard(localBoard)

console.log(isWin)