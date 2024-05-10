var pst = 44;
var startscr;
var dir = 1;
var jl = 5;
var myhp = 100;
var fillrate = 10;
let brick = new Array(fillrate + 1).fill(0);
var isnotok = 0;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function replaceNthChar(str, n, newChar) {
    if (typeof str !== 'string') {
        str = str.toString(); // 如果 str 不是字符串，将其转换为字符串
    }
    if (n >= str.length || n < 0) {
        // 如果 n 超出字符串长度或为负数，返回原始字符串
        return str;
    }

    if (str[n] === '\n') {
        return str.substring(0, n) + '\n' + str.substring(n + 1);
    }
    return str.substring(0, n) + newChar + str.substring(n + 1);
}


function Generate() {
    // 获取文本框中的内容
    fillrate = document.getElementById('userInput').value;
    var text = '';
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 60; j++) {
            text += '□';
        }
        text += '\n'; // 换行
    }
    for (var i = 1; i <= fillrate; i++) {
        isnotok = 0;
        brick[i] = getRandomInt(1, 1200);
        //console.log('lucky brick num ',brick[i])
        outer:
        for (var j = 1; j <= 20; j++) {
            if (brick[i] === 61 * j) {
                isnotok += 1;
                console.log("Found a BAD BUG!!!", brick[i]);
                //brick[i] += 1;
                brick[i]=1;
                console.log(brick[i]);
                break outer;
            }
        }
    }
        //console.log("num ",brick[i]," 'si rate is " ,isnotok,";")
        // if (isnotok === 0) {
            for(var i=1;i<=fillrate;i+=1){
            let af = text;
            af = replaceNthChar(text, brick[i], '■');
            text = af;
        // }
            }

    
    startscr = replaceNthChar(text, pst, '*');
    // 将获取的内容设置为下方标签的文本内容
    document.getElementById('output').textContent = startscr;
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        outer:
        if (event.keyCode === 87) {
            console.log('按下了 w 键');
            
            for(var k=1;k<=fillrate;k++){
                if(startscr[pst-61]==='■'){
                    console.log('wall here!')
                    break outer;
                }
                
            }
            let bf = startscr;
            let endst = replaceNthChar(bf, pst - 61, '*');
            endst = replaceNthChar(endst, pst, '□');
            pst -= 61;
            startscr = endst;
            dir = 1;
            document.getElementById('output').textContent = startscr;
            console.log('now pst to ', pst);
        }
        outer:
        if (event.keyCode === 65) {
            console.log('按下了 a 键');
            for(var k=1;k<=fillrate;k++){
                if(startscr[pst-1]==='■'){
                    console.log('wall here!')
                    break outer;
                }
                
            }
            if (pst === 61) {
                pst -= 1;
            }
            dir = 2
            let bf = startscr;
            let endst = replaceNthChar(bf, pst - 1, '*');
            endst = replaceNthChar(endst, pst, '□');
            pst -= 1;
            startscr = endst;
            document.getElementById('output').textContent = startscr;
            console.log('now pst to ', pst);
        }
        outer:
        if (event.keyCode === 83) {
            console.log('按下了 s 键');
            for(var k=1;k<=fillrate;k++){
                if(startscr[pst+61]==='■'){
                    console.log('wall here!')
                    break outer;
                }
                
            }
            dir = 3;
            let bf = startscr;
            let endst = replaceNthChar(bf, pst + 61, '*');
            endst = replaceNthChar(endst, pst, '□');
            pst += 61;
            startscr = endst;
            document.getElementById('output').textContent = startscr;
            console.log('now pst to ', pst);
        }
        outer:
        if (event.keyCode === 68) {
            console.log('按下了 d 键');
            for(var k=1;k<=fillrate;k++){
                if(startscr[pst+1]==='■'){
                    console.log('wall here!')
                    break outer;
                }
                
            }
            dir = 4;
            if (pst === 59) {
                pst += 1;
            }

            let bf = startscr;
            let endst = replaceNthChar(bf, pst + 1, '*');
            endst = replaceNthChar(endst, pst, '□');
            pst += 1;
            startscr = endst;
            document.getElementById('output').textContent = startscr;
            console.log('now pst to ', pst);
        }
        if (event.keyCode === 82) {
            IsShot();
        }
    });
});
function pause(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
async function main() {
    await pause(2000);
}
async function IsShot() {
    console.log('按下了 r 键');
    if (dir === 4) {
        var bul = pst;

        let bf = startscr;
        let endst;
        for (var i = 1; i <= jl; i++) {
            await pause(200);
            endst = replaceNthChar(bf, bul + 1, 'o');
            console.log('now bullet shot to ', bul);
            if (bul !== pst) {
                endst = replaceNthChar(endst, bul, '□');
            }
            bul += 1;
            startscr = endst;
            document.getElementById('output').textContent = startscr;

        }
        await pause(500);
        endst = replaceNthChar(endst, bul, '□');
        startscr = endst;
        document.getElementById('output').textContent = startscr;
        bul -= 5;//bullet restore




        console.log('now pst to ', pst);
        console.log('now bullet shot to ', bul)
    }
    if (dir === 3) {
        var bul = pst;

        let bf = startscr;
        let endst;
        for (var i = 1; i <= jl; i++) {
            await pause(200);
            endst = replaceNthChar(bf, bul + 61, 'o');
            console.log('now bullet shot to ', bul);
            if (bul !== pst) {
                endst = replaceNthChar(endst, bul, '□');
            }
            bul += 61;
            startscr = endst;
            document.getElementById('output').textContent = startscr;

        }
        await pause(500);
        endst = replaceNthChar(endst, bul, '□');
        startscr = endst;
        document.getElementById('output').textContent = startscr;
        bul -= 5 * 61;//bullet restore




        console.log('now pst to ', pst);
        console.log('now bullet shot to ', bul)
    }
    if (dir === 1) {
        var bul = pst;

        let bf = startscr;
        let endst;
        for (var i = 1; i <= jl; i++) {
            await pause(200);
            endst = replaceNthChar(bf, bul - 61, 'o');
            console.log('now bullet shot to ', bul);
            if (bul !== pst) {
                endst = replaceNthChar(endst, bul, '□');
            }
            bul -= 61;
            startscr = endst;
            document.getElementById('output').textContent = startscr;

        }
        await pause(500);
        endst = replaceNthChar(endst, bul, '□');
        startscr = endst;
        document.getElementById('output').textContent = startscr;
        bul += 5 * 61;//bullet restore




        console.log('now pst to ', pst);
        console.log('now bullet shot to ', bul)
    }
    if (dir === 2) {
        var bul = pst;

        let bf = startscr;
        let endst;
        for (var i = 1; i <= jl; i++) {
            await pause(200);
            endst = replaceNthChar(bf, bul - 1, 'o');
            console.log('now bullet shot to ', bul);
            if (bul !== pst) {
                endst = replaceNthChar(endst, bul, '□');
            }
            bul -= 1;
            startscr = endst;
            document.getElementById('output').textContent = startscr;

        }
        await pause(500);
        endst = replaceNthChar(endst, bul, '□');
        startscr = endst;
        document.getElementById('output').textContent = startscr;
        bul += 5;//bullet restore




        console.log('now pst to ', pst);
        console.log('now bullet shot to ', bul)
    }
}
function playeract() {

}
// function replaceNthChar(str, n, newChar) {
//     if (n >= str.length || n < 0) {
//         console.log('Err_invalidChange')
//         return str;
//     }

//     return str.substring(0, n) + newChar + str.substring(n + 1);
// }


function isHuiche(variable, n) {
    if (typeof variable !== 'string') {
        // 如果变量不是字符串类型，返回 false
        return true;
    }

    if (n >= variable.length || n < 0) {
        // 如果 n 超出字符串长度或为负数，返回 false
        return false;
    }

    return variable[n] === '\r';
}