// 定义棋盘格坐标，也就是一个二维数组
var board = new Array();
var hasConflicted = new Array();
var score = 0;
$(function(){
    newGame();
})
function newGame(){
    // 初始化棋盘格
    init();
    // 生成第一个随机位置的随机数字
    generateOneNumber();
    // 生成第二个随机位置的随机数字
    generateOneNumber();
}
function restartgame(){
    $("#gameover").remove();
    updateScore(0);
    newGame();
}
function init(){
    for(var i = 0; i < 4; i++){
        // 真正实现棋盘格的二维数组
        board[i] = new Array();
        for(var j = 0; j < 4; j ++){
            // 初始化小格子的值为0
            board[i][j] = 0;
            // 获取dom元素，得到(i, j)位置的小格子
            var gridCell = $('#grid-cell-' + i + '-' + j);
            //通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css("top", getPosTop(i, j));
            //通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left", getPosLeft(i, j));
            
        }
    }
    updateBoardView();
}
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            //向棋盘格上增加数字格 
        	$("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘格的值为0的话,设置数字格为高宽都为0
            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            } 
            //如果棋盘格的值不为0的话,设置数字格为高宽为75并设置背景色和前景色及数字值
            else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
}
function generateOneNumber() {
// 生成一个随机'位置'的随机'数字'
// 1.生成随机的位置
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4)); 
    // 确保整个格子是空格子
    while(true){
        if(!board[randX][randY]){
            break;
        }
        var randX = parseInt(Math.floor(Math.random() * 4));
        var randY = parseInt(Math.floor(Math.random() * 4));
    }
// 2.生成随机的数字(只能是2或者4)
    var randNum = Math.random() < 0.5 ? 2 : 4;
// 3.在随机位置上显示出随机的数字    
    //在随机位置显示随机数字
    board[randX][randY] = randNum;
    //实现随机数字显示的动画
    ShowNumberWithAnimation(randX, randY, randNum);
}