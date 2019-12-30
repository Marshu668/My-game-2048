$(document).keydown(function(event){        //event是keydown事件自带的
    switch (event.keyCode){
        case 37://left
            /*
            moveLeft()方法
                * 完成向左移动的逻辑
                * 返回值是Boolean类型,判断是否可以向左移动.
             */
            if (moveLeft()) {
                //重新地随机生成两个数字
                generateOneNumber();
                //判断当这次的移动完成之后,游戏是否结束了
                isgameover();
            }
            break;
        case 38://up
        if (moveUp()) {
            //重新地随机生成两个数字
            generateOneNumber();
            //判断当这次的移动完成之后,游戏是否结束了
            isgameover();
        }
            break;
        case 39://right
        if (moveRight()) {
            //重新地随机生成两个数字
            generateOneNumber();
            //判断当这次的移动完成之后,游戏是否结束了
            isgameover();
        }
            break;
        case 40://down
        if (moveDown()) {
            //重新地随机生成两个数字
            generateOneNumber();
            //判断当这次的移动完成之后,游戏是否结束了
            isgameover();
        }
            break;
    }
});
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    //moveLeft
    for (var i = 0; i < 4; i++) { 
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    //判断当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
                    if (board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    } 
                    //判断当前值不为0的数字格与左边的数字格值相等并且中间的数字格必须值也为0
                    else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    //moveRight
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    //moveUp
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlokHorizontalRow(k, i, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(k, i, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    //moveDown
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlokHorizontalRow(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(i, k, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}
function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}