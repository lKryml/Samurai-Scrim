const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
c.fillRect(0, 0, canvas.width, canvas.height);



let timer = 60;
const gravity = 0.2
const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },

    ArrowRight: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    
    },
    imageSrc: './assets/background.png'
})



const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    
    },
    imageSrc: './assets/shop.png',
    scale: 2.75,
    frames: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 400,
        y: 0
    },
    offset: {
        x: 100,
        y: 92
    },
    imageSrc: './assets/samuraiMack/Idle.png',
    scale: 2,
    frames: 8,
    sprites: {
        idle: {
            imageSrc: './assets/samuraiMack/Idle.png',
            frames: 8
        },
        run: {
            imageSrc: './assets/samuraiMack/run.png',
            frames: 8
        },
        jump: {
            imageSrc: './assets/samuraiMack/Jump.png',
            frames: 2
        },
        fall: {
            imageSrc: './assets/samuraiMack/Fall.png',
            frames: 2
        },
        attack1: {
            imageSrc: './assets/samuraiMack/Attack1.png',
            frames: 6
        },
        takeHit: {
            imageSrc: './assets/samuraiMack/Take-hit.png',
            frames: 4
        },
        death: {
            imageSrc: './assets/samuraiMack/Death.png',
            frames: 6
        }
    },
    attackBox: {
        offset: {
            x: -140,
            y: 50
    },
    width: 100,
        height: 50
    }

})

const enemy = new Fighter({
    position: {
        x: 600,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 100,
        y: 105
    },
    imageSrc: './assets/kenji/Idle.png',
    scale: 2,
    frames: 4,
    sprites: {
        idle: {
            imageSrc: './assets/kenji/Idle.png',
            frames: 4
        },
        run: {
            imageSrc: './assets/kenji/run.png',
            frames: 8
        },
        jump: {
            imageSrc: './assets/kenji/Jump.png',
            frames: 2
        },
        fall: {
            imageSrc: './assets/kenji/Fall.png',
            frames: 2
        },
        attack1: {
            imageSrc: './assets/kenji/Attack1.png',
            frames: 4
        },
        takeHit: {
            imageSrc: './assets/kenji/Take-hit.png',
            frames: 3
        },
        death: {
            imageSrc: './assets/kenji/Death.png',
            frames: 7
        }
    },
   attackBox: {
    offset: {
      x: 160,
      y: 50
    },
    width: 100,
    height: 50
  }
})


decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = (
        'rgba(255,255,255,0.08)'
    )
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()
    player.velocity.x = 0
    enemy.velocity.x = 0


    // player movement
    if (keys.d.pressed && keys.a.pressed) {
        player.velocity.x = 0
        player.switchSprite('idle')
    }
    else if (keys.a.pressed) {
        player.velocity.x = -5
        player.switchSprite('run')
    }
    else if (keys.d.pressed) {
        player.velocity.x = 5
        player.switchSprite('run')
    }
    else {
        player.switchSprite('idle')
    }


    // jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
        console.log('hello')
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }
   

    //enemy movement
    if (keys.ArrowRight.pressed && keys.ArrowLeft.pressed) {
        enemy.velocity.x = 0
        enemy.switchSprite('idle')
    }
    else if (keys.ArrowLeft.pressed) {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }
    else if (keys.ArrowRight.pressed) {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
        
    }
    else {
        enemy.switchSprite('idle')
    }
     // enemy jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
        console.log('hello')
    }
    else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    // collision detection 
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking && player.frameCurrent === 4) {
        console.log("player atk")
        
        player.isAttacking = false
            enemy.takeHit()
           
        gsap.to('#enemy-health', {
            width: enemy.health + '%',
        } )
        
    }
    if (player.isAttacking && player.frameCurrent === 4) {
        player.isAttacking = false
    }

    ///////
    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking && enemy.frameCurrent === 2) {
        console.log("enemy atk")
        enemy.isAttacking = false
        
        player.takeHit()
            
        gsap.to('#player-health', {
            width: player.health + '%',
        } )
    }
    if (enemy.isAttacking && enemy.frameCurrent === 2) {
        enemy.isAttacking = false
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        gameOver(player,enemy,timerID)
    }
}
animate()


window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                break;
            case 'a':
                keys.a.pressed = true
                break;
            case 'w':
                keys.w.pressed = true
                if (player.velocity.y == 0)
                    player.velocity.y = -11
            
                break;
            case 's':
                keys.s.pressed = true
                if (player.position.y - player.height - player.velocity.y <= player.height) {
                    player.velocity.y = 5
                }
                break;
        }
    }
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                break;
            case 'ArrowUp':
                keys.ArrowUp.pressed = true
                if (enemy.velocity.y == 0)
                    enemy.velocity.y = -11
                break;
            // GRAVITY DOWN DISABLED FOR KENJI FOR BALANCE PURPOSES
            /*case 'ArrowDown':
                keys.ArrowDown.pressed = true
                if (enemy.position.y - enemy.height - enemy.velocity.y <= enemy.height) {
                    enemy.velocity.y = 5
                }
                break;*/
            case ' ':
                player.attack()
                break;
            case 'ArrowDown':
                enemy.attack()
                break;
        }
    }
    
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 'w':
            keys.w.pressed = false
            break;
        case 's':
            keys.s.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break;
    }

})