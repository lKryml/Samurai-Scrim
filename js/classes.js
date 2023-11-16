



class Sprite {
    constructor({ position, imageSrc, scale = 1, frames = 1, offset = {x:0, y: 0}}) {

        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frames = frames
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 19
        this.offset = offset
    }

    draw() {
        c.drawImage(this.image,
            this.frameCurrent * (this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,

            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.frames) * this.scale,
            this.image.height * this.scale)
    }

    update() {
        this.draw()
        this.animateFrames()
    }
    
    animateFrames() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.frames - 1)        
            this.frameCurrent++
        else this.frameCurrent = 0
    }
    }
        
}
class Fighter extends Sprite {
    constructor({ position, velocity, color = 'red', imageSrc, scale = 1, frames = 1, offset = { x: 0, y: 0 }, sprites, attackBox = {offset: {}, width: undefined, height:undefined} }) {
        super({
            imageSrc,
            scale,
            frames,
            position,
            offset
        })
        this.isAttacking
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.color = color
        this.health = 100
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 19
        this.sprites = sprites
        this.dead = false
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    // Draws fighters and attack boxes as rectangles, used before sprites
    /*draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // attack box
        //if (this.isAttacking) {
        c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        //}
    }*/

    update() {
        this.draw()
    if (!this.dead) this.animateFrames()
        // attack box
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 86) {
            this.velocity.y = 0
            this.position.y = 331.1999999999997
        }
        else
            this.velocity.y += gravity
    }
    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        
        

        setTimeout(() => {
            this.isAttacking = false
        }, 1500)
    }

    takeHit() {
        if (this.health <= 20) {
            this.switchSprite('death')
            console.log('ded')
            this.health -= 20
        }
        else {
            console.log(this.health)
        this.switchSprite('takeHit')
        this.health -= 20
        }   
    }
    
    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.frameCurrent === this.sprites.death.frames - 1)
                this.dead = true
            return
        }
        

        if (this.image === this.sprites.attack1.image && this.frameCurrent < this.sprites.attack1.frames - 1)
            return

        if (
            this.image === this.sprites.takeHit.image && this.frameCurrent < this.sprites.takeHit.frames - 1
        )
            return

        switch (sprite) {
            case 'death':
                if (this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image;
                    this.frames = this.sprites.death.frames
                    this.frameCurrent = 0
                }
                break
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.frames = this.sprites.idle.frames
                    this.frameCurrent = 0 
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.frames = this.sprites.run.frames
                    this.frameCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image;
                    this.frames = this.sprites.jump.frames
                    this.frameCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image;
                    this.frames = this.sprites.fall.frames
                    this.frameCurrent = 0
                }
                break 
            case 'attack1':
                if (this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image;
                    this.frames = this.sprites.attack1.frames
                    this.frameCurrent = 0
                }
                break
                
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image;
                    this.frames = this.sprites.takeHit.frames
                    this.frameCurrent = 0
                }
                break
            
        }
    }
}
