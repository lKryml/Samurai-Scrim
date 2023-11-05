function gameOver(player, enemy, timerID) {  
    if (player.health === enemy.health) {
        document.querySelector('#display-screen').innerHTML = 'Tie';
        
        }
        else if(player.health > enemy.health) {
        document.querySelector('#display-screen').innerHTML = 'Player 1 Wins!';
        }
        else if (enemy.health > player.health) {
        document.querySelector('#display-screen').innerHTML = 'Player 2 Wins!';
        
    }
    clearTimeout(timerID)
    document.querySelector('#display-screen').style.display = 'flex'
    
    
}
        


function decreaseTimer() {
    if (timer > 0) {    
        timer--
        document.querySelector('#timer').innerHTML = timer
        timerID=setTimeout(decreaseTimer, 1000)  
    }
    
    if (timer == 0) {
        gameOver(player,enemy,timerID)
    }
}
function rectangularCollision({ rectangle1, rectangle2 }) {

    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        
    )

}
