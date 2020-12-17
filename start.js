
var player1Name
var player2Name

var isPlayer1Ready=false
var isPlayer2Ready=false

// console.log(document.getElementById("getPlayer1Name"))

document.getElementById("getPlayer1Name").addEventListener('click',function () {
    player1Name=document.getElementById('player1Name').value
    // console.log(player1Name)
    document.getElementById('player1Img').classList.remove('hide')
    document.getElementById('player1Input').classList.add('hide')
    // console.log(document.querySelector('#player1Img p'))
    document.querySelector('#player1Img p').innerHTML=`${player1Name} is ready`

    isPlayer1Ready=true

    if(isPlayer2Ready && isPlayer1Ready){
        document.getElementById("pickPlayer").classList.add('hide')
        document.getElementById("arena").classList.remove('hide')
    }
})

document.getElementById("getPlayer2Name").addEventListener('click',function () {
    player2Name=document.getElementById('player2Name').value
    // console.log(player1Name)
    document.getElementById('player2Img').classList.remove('hide')
    document.getElementById('player2Input').classList.add('hide')
    // console.log(document.querySelector('#player1Img p'))
    document.querySelector('#player2Img p').innerHTML=`${player2Name} is ready`

    isPlayer2Ready=true

    if(isPlayer2Ready && isPlayer1Ready){
        document.getElementById("pickPlayer").classList.add('hide')
        document.getElementById("arena").classList.remove('hide')
    }

    setTimeout(function(){
        changeTurn(2)
    },3000)


})




// THE GAME
//////////////////////////////////////////////////////////////////

var boxes=document.getElementsByClassName('box')

var turn=2

var board=[
    ['','',''],
    ['','',''],
    ['','','']
]

function markBoard(num){
    var count=0

    if(turn===0){
        return
    }
    // console.log('aaa')
    // console.log(num)
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            if(count===num){
                if(!board[i][j]){
                    board[i][j]=turn===1?'X':'O'
                }
                console.log(board)
                
                // check if finished
                console.log('iswin ',isWin())
                if(isWin()==='X'){
                    console.log('x wins')
                    turn=0
                    endGame(2)
                }
                if(isWin()==='O'){
                    console.log('o wins')
                    turn=0
                    endGame(1)
                }

                
                return
            }
            count++
        }
    }
}

// check if win
function isWin(){
    // console.log('is win')
    console.log(board)
    
    // check horizontal
    for(let i=0;i<3;i++){
        if(board[i][0]===board[i][1] && board[i][0]===board[i][2] && board[i][0]!==''){
            // console.log('horizontal')
            return board[i][0]
        }
    }

    // check vertical
    for(let j=0;j<3;j++){
        if(board[0][j]===board[1][j] && board[0][j]===board[2][j] && board[0][j]!==''){
            // console.log('vertical')
            return board[0][j]
        }
    }

    // check accros
    if(board[0][0]===board[1][1] && board[0][0]===board[2][2] && board[0][0]!==''){
        // console.log('accros a')
        return board[0][0]
    }
    if(board[2][0]===board[1][1] && board[2][0]===board[0][2] && board[1][1]!==''){
        // console.log('accros b')
        return board[1][1]
    }

    return false

}


// initial
// changeTurn(2)
for(let i=0;i<boxes.length;i++){
    var isMarked=boxes[i].querySelector(".mark")!==null
    if(!isMarked){
        boxes[i].addEventListener('click',mark)
        boxes[i].addEventListener('click',function(){
            markBoard(i);
            
        })
        boxes[i].style.cursor='pointer'
    }else{
        boxes[i].style.cursor='none'
    }
}


function changeTurn(player){

    // clean state
    // remove all eventlistener

    if(turn===0){
        return
    }

    console.log('changing turn')
    
    turn=player

    if(turn===1){
        // document.getElementById('arena').style.background='rgba(0,0,0,.5)'
        document.getElementById('msgPlayer2').classList.remove('turn')
        document.getElementById('msgPlayer1').classList.add('turn')
    }else if(turn===2){
        console.log('turn 2')
        document.getElementById('msgPlayer1').classList.remove('turn')
        document.getElementById('msgPlayer2').classList.add('turn')
        // document.getElementById('arena').style.background='rgba(0,0,0,0)'
    }

    

    // if(turn===2){
    //     for(let i=0;i<boxes.length;i++){
    //         var isMarked=boxes[i].querySelector(".mark")!==null
    //         // console.log(isMarked)
    //         // console.log(boxes[i].querySelector(".mark"))
    //         if(!isMarked){
    //             boxes[i].removeEventListener('click',markO)
    //             boxes[i].addEventListener('click',markX)
    //             boxes[i].addEventListener('click',function(){
    //                 markBoard(i);
    //             })
    //             boxes[i].style.cursor='pointer'
    //         }else{
    //             boxes[i].style.cursor='none'
    //         }
    //     }
    // }else if(turn===1){
    //     for(let i=0;i<boxes.length;i++){
    //         var isMarked=boxes[i].querySelector(".mark")!==null
    //         if(!isMarked){
    //             boxes[i].removeEventListener('click',markX)
    //             boxes[i].addEventListener('click',markO)
    //             boxes[i].addEventListener('click',function(){
    //                 markBoard(i);
    //             })
    //             boxes[i].style.cursor='pointer'
    //         }else{
    //             boxes[i].style.cursor='none'
    //         }
    //     }
    // }
}


function mark(e){

    if(turn===0){
        return
    }

    var mark=document.createElement('span')
    if(turn===2){
        mark.innerHTML='X'
    }else{
        mark.innerHTML='O'
    }
    mark.classList.add('mark')

    // check if already marked
    var isMarked=e.target.classList.contains('mark')

    if(!isMarked){
        e.target.appendChild(mark)

        // change turn
        if(turn===2){
            changeTurn(1)
        }else{
            changeTurn(2)
        }

    }
}


function markX (e) {
    var mark=document.createElement('span')
    mark.innerHTML='X'
    mark.classList.add('mark')

    // check if already marked
    var isMarked=e.target.classList.contains('mark')

    if(!isMarked){
        e.target.appendChild(mark)


        // check if finished


        // change turn
        changeTurn(1)
    }


    // console.log(e.target)
    // console.log(e.target.querySelector(".mark"))
    // console.log(document.querySelector(".mark"))
    // console.log(e.target.classList.contains('mark'))

    // mark board

    // changeturn to player 1
    // changeTurn(1)
}

function markO (e) {
    var mark=document.createElement('span')
    mark.innerHTML='O'
    mark.classList.add('mark')

    // check if already marked
    var isMarked=e.target.classList.contains('mark')

    if(!isMarked){
        e.target.appendChild(mark)
        changeTurn(2)
    }
}




function endGame(player){
    document.getElementById('msgPlayer1').classList.remove('turn')
    document.getElementById('msgPlayer2').classList.remove('turn')

    // var winner=document.createElement('p')
    // winner.innerHTML=player===1?'Superman Wins':player===2?'Joker Wins':'Draw'
    // document.getElementById('winner').appendChild(winner)
    document.getElementById('winner').classList.remove('hide')

    setTimeout(function(){
        document.getElementById("arena").classList.add('hide')
        setTimeout(function(){
            if(player===1){
                document.getElementById('superman').classList.add('appear')
            }else if(player===2){
                document.getElementById('joker').classList.add('appear')
                document.getElementById('winner').style.background='rgba(0,0,0,.2)'
            }
            
        },500)
    },1000)
}



