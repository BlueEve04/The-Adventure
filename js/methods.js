var pst = 200;
var hp = 100;
var startscr;
var dir = 1;
var jl = 5;
var myhp = 100;
var fillrate = 10;
let brick = new Array(fillrate + 1).fill(0);
var isnotok = 0;
var zf = 15;
let zblock = new Array(zf + 1).fill(1);
var defen = 2.5;
var damage = 10;
var nowstat = 0;
var td = 100;
var littleMed='小药品-回复25hp'//0
var smallKnife = '小折叠刀-伤害20,无附加效果';//1
var dagger = '匕首-伤害35，5%概率暴击伤害40(被动：进攻就是最好的防守！)防御力+10';//2
var LightKnife = '光剑-伤害99,（被动：能量不足）20%伤害为1';//3
var BrokenGun = '破损的猎枪-伤害15,无附加效果'//4
var nowItem1 = 4;    //初始物品1
var nowItem2 = 1;    //初始物品2
var nowRead=1;    //物品栏光标
let mywep = new Array(9).fill('空');    //物品栏文字存储
let mywepStorange = new Array(9).fill(0);     //NO USED YET
var zombh=getRandomInt(15,25);
function DamRand(rate) {
    var a = getRandomInt(0, 100);
    if (a <= rate) {
        return 1;
    }
    else
        return 0;
}
// function StorangeItem2Game(){
    
// }

/////////////////////////Maybe reuse someday////////////////////////////
// function MyWeapon(num){
//     if(num===1){
//         damage=20;
//     }
//     if(num===2){
//         var x;
//         if(DamRand(20)===0){
//             damage=35;
//         }
//         if(DamRand(20)===1){
//             damage=40
//         }
//     }
// }
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function IsChosen(str) {
    if (typeof str !== 'string') {
        str = str.toString(); // 如果 str 不是字符串，将其转换为字符串
    }
    return '[' + str + ']';
}
function DeChosen(str){
    if (typeof str !== 'string') {
        str = str.toString(); // 如果 str 不是字符串，将其转换为字符串
    }

    return str.substring(1,str.length-1);
}
// function FillItem(){
//     for(vari=1;i<=8;i++){
        
//     }
// }
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
// function MedUsed(num){
//     if(event.keyCode===85&&mywep[num]===littleMed){
//         console.log('HAVING MEDICINE!!!');
//         mywep[num]='空';
//         document.getElementById('i'+num).textContent=mywep[num];
//     }
// }

function Generate_Main() {
    mywep[1] = smallKnife;
    mywep[2]=BrokenGun;
    mywep[3]=littleMed;
    for(var m=1;m<=8;m++){
        document.getElementById('i'+m).textContent = mywep[m];
    }
    nowstat += 1;
    zf += nowstat * getRandomInt(1, 4);
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
                brick[i] = 1;
                console.log(brick[i]);
                break outer;
            }
        }
    }
    //console.log("num ",brick[i]," 'si rate is " ,isnotok,";")
    // if (isnotok === 0) {
    for (var i = 1; i <= fillrate; i += 1) {
        let af = text;
        af = replaceNthChar(text, brick[i], '■');
        text = af;
        // }
    }


    startscr = replaceNthChar(text, pst, '*');
    // 将获取的内容设置为下方标签的文本内容
    GenerateZom();
    SetWall();
    DoorGene();
    BoxGene();
}
function GenerateZom() {
    // 获取文本框中的内容

    for (var i = 1; i <= zf; i++) {
        isnotok = 0;
        zblock[i] = getRandomInt(1, 1200);
        //console.log('lucky brick num ',brick[i])


    }
    //console.log("num ",brick[i]," 'si rate is " ,isnotok,";")
    // if (isnotok === 0) {
    for (var i = 1; i <= zf; i += 1) {
        let af = startscr;
        af = replaceNthChar(af, zblock[i], 'z');
        startscr = af;
        // }
    }
    // 将获取的内容设置为下方标签的文本内容
    document.getElementById('output').textContent = startscr;
    document.getElementById('hp').textContent = hp;
}

function SetWall() {
    for (var i = 0; i < 60; i++) {
        let af = startscr;
        af = replaceNthChar(startscr, i, '■');
        startscr = af;
        document.getElementById('output').textContent = startscr;
        console.log('setting walls top')
    }
    for (var i = 0; i < 61 * 20; i += 61) {
        let af = startscr;
        af = replaceNthChar(startscr, i, '■');
        startscr = af;
        document.getElementById('output').textContent = startscr;
        console.log('setting walls left')
    }
    for (var i = 59; i < 61 * 20; i += 61) {
        let af = startscr;
        af = replaceNthChar(startscr, i, '■');
        startscr = af;
        document.getElementById('output').textContent = startscr;
        console.log('setting walls right')
    }
    for (var i = 1159; i <= 1159 + 60; i += 1) {
        let af = startscr;
        af = replaceNthChar(startscr, i, '■');
        startscr = af;
        document.getElementById('output').textContent = startscr;
        console.log('setting walls bottom')
    }
    var door
    document.getElementById('output').textContent = startscr;
}


function HPloss(mobtype) {
    zombh=getRandomInt(15,25);
    hp -= mobtype - defen;
    document.getElementById('hp').textContent = hp;
    if (hp <= 0) {
        document.getElementById('stat').textContent = '你死了'
        document.removeEventListener('keydown', function (event) { });
    }
}
function Tiredloss(a) {
    td -= a;

}
////////////////////////////////////未完成僵尸逻辑——————来自zyl//////////////////////////////////
// async function MobDec(a,) {
//     for (var i = a - 2; i <= a + 2; i++) {
//         for (var j = a - 122; j <= a + 122; j += 61) {
//             if (startscr[j] == 'z') {
//                 console.log('ALERT!!!FOUND A',/*mobtype*/zombie)

//             }
//         }
//     }
// }
function DoorGene() {
    var doorblock = 0;
    doorblock = getRandomInt(1, 1200);
    while (startscr[doorblock] !== '□') {
        doorblock = getRandomInt(1, 1200);
    }
    let af = startscr;
    af = replaceNthChar(af, doorblock, '#');
    startscr = af;
    document.getElementById('output').textContent = startscr;
    document.getElementById('hp').textContent = hp;
}
// function IsAtDoor(a){
//     for(var i=a-1;i<=a+1;i++){
//         for(var j=i-61;j<=i+61;j+=61){
//             if(startscr[j]=='#'){
//                 console.log('door here! LET\'S GOOOO!!')

//             }
//         }
//     }
// }

function BoxGene() {
    var doorblock = 0;
    doorblock = getRandomInt(1, 1200);
    while (startscr[doorblock] !== '□') {
        doorblock = getRandomInt(1, 1200);
    }
    let af = startscr;
    af = replaceNthChar(af, doorblock, '∩');
    startscr = af;
    document.getElementById('output').textContent = startscr;
    document.getElementById('hp').textContent = hp;
}

document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('keydown', async function (event) {
        outer:
        if (event.keyCode === 87) {
            console.log('按下了 w 键');
            dir = 1;

            if (startscr[pst - 61] === '■') {
                console.log('wall here!')
                break outer;
            }
            if (startscr[pst - 61] === 'z') {
                console.log('zombie here!')
                HPloss(zombh);
            }
            if (startscr[pst - 61] === '#') {
                console.log('DOOR here!LET\'S GOOOOOOO!!!!!')
                Generate_Main();
            }
            let bf = startscr;
            let endst = replaceNthChar(bf, pst - 61, '*');
            endst = replaceNthChar(endst, pst, '□');
            pst -= 61;
            startscr = endst;

            document.getElementById('output').textContent = startscr;
            console.log('now pst to ', pst);
        }
        outer:
        if (event.keyCode === 65) {
            dir = 2
            console.log('按下了 a 键');

            if (startscr[pst - 1] === '■') {
                console.log('wall here!')
                break outer;
            }
            if (startscr[pst - 1] === 'z') {
                console.log('zombie here!')
                HPloss(zombh);
            }
            if (startscr[pst - 1] === '#') {
                console.log('DOOR here!LET\'S GOOOOOOO!!!!!')
                Generate_Main();
            }


            if (pst === 61) {
                pst -= 1;
            }

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

            if (startscr[pst + 61] === '■') {
                console.log('wall here!')
                break outer;
            }
            if (startscr[pst + 61] === 'z') {
                console.log('zombie here!')
                HPloss(zombh);
            }
            if (startscr[pst + 61] === '#') {
                console.log('DOOR here!LET\'S GOOOOOOO!!!!!')
                Generate_Main();
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

            if (startscr[pst + 1] === '■') {
                console.log('wall here!')
                break outer;
            }
            if (startscr[pst + 1] === 'z') {
                console.log('zombie here!')
                HPloss(zombh);
            }
            if (startscr[pst + 1] === '#') {
                console.log('DOOR here!LET\'S GOOOOOOO!!!!!')
                Generate_Main();
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
        if (event.keyCode === 69) {
            console.log('Reading Items!');
            if (nowRead === 1) {
                var item = IsChosen(mywep[nowRead]);
                document.getElementById('i1').textContent = item;
                
                nowRead+=1;
                
            }
            if (nowRead === 9){
                nowRead=1;
                var item = IsChosen(mywep[nowRead]);
                var deit= DeChosen(mywep[8]);
                document.getElementById('i'+(8)).textContent = deit;
                document.getElementById('i'+1).textContent = item;
                
            nowRead+=1;
                
            }
            else {
                var item = IsChosen(mywep[nowRead]);
                var deit= DeChosen(mywep[nowRead-1]);
                document.getElementById('i'+(nowRead-1)).textContent = deit;
                document.getElementById('i'+nowRead).textContent = item;
                
            nowRead+=1;
                
            }
    
        }
        if(event.keyCode===85&&mywep[nowRead-1]===littleMed){
            console.log('HAVING MEDICINE!!!');
            mywep[nowRead-1]='空';
            document.getElementById('i'+(nowRead-1)).textContent=mywep[nowRead-1];
            hp+=25;
            document.getElementById('hp').textContent=hp;
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