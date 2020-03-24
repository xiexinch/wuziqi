export var wins = [];      // 赢法统计数组
export var count = 0;      // 赢法统计数组的计数器
var me = true;              // 判断该轮黑白棋落子权
export var over = false;           // 判断游戏是否结束
var chessBoard = [];        // 棋盘二维数组,存储棋盘信息

// 初始化赢法统计数组
for (var i = 0; i < 12; i++) {
    wins[i] = [];
    for (var j = 0; j < 12; j++) {
        wins[i][j] = []
    }
}

export var myWin = [];
export var airingWin = [];

// 阳线纵向90°的赢法
for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 8; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}

// 阳线横向0°的赢法
for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 8; j++) {
        for (var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}

// 阴线斜向135°的赢法
for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}

// 阴线斜向45°的赢法
for (var i = 0; i < 8; i++) {
    for (var j = 11; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    airingWin[i] = 0;
}

/**
 * AI
 */
export function airingGo(chessBoard) {
    if (over) {
        return;
    }
   

    var u = 0;              // 电脑预落子的x位置
    var v = 0;              // 电脑预落子的y位置
    var myScore = [];       // 玩家的分数
    var airingScore = [];   // 电脑的分数
    var max = 0;            // 最优位置的分数

    // 初始化分数的二维数组
    for (var i = 0; i < 12; i++) {
        myScore[i] = [];
        airingScore[i] = [];
        for (var j = 0; j < 12; j++) {
            myScore[i][j] = 0;
            airingScore[i][j] = 0;
        }
    }

    // 通过赢法统计数组为两个二维数组分别计分
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
            if (chessBoard[i][j] === 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k] === true) {
                        if (myWin[k] === 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] === 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] === 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] === 4) {
                            myScore[i][j] += 10000;
                        }
                        if (airingWin[k] === 1) {
                            airingScore[i][j] += 220;
                        } else if (airingWin[k] === 2) {
                            airingScore[i][j] += 420;
                        } else if (airingWin[k] === 3) {
                            airingScore[i][j] += 2100;
                        } else if (airingWin[k] === 4) {
                            airingScore[i][j] += 20000;
                        }
                    }
                }               
                // 如果玩家(i,j)处比目前最优的分数大，则落子在(i,j)处
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] === max) {
                    // 如果玩家(i,j)处和目前最优分数一样大，则比较电脑在该位置和预落子的位置的分数
                    if (airingScore[i][j] > airingScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                
                // 如果电脑(i,j)处比目前最优的分数大，则落子在(i,j)处
                if (airingScore[i][j] > max) {
                    max  = airingScore[i][j];
                    u = i;
                    v = j;
                } else if (airingScore[i][j] === max) {
                    // 如果电脑(i,j)处和目前最优分数一样大，则比较玩家在该位置和预落子的位置的分数
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }

     chessBoard[u][v] = 2;

    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            airingWin[k]++;
            myWin[k] = 6;
            if (airingWin[k] === 5) {
                window.alert("You Fail!");
                over = true
                break
            }
        }
    }
    
    return [u, v]
}
