var Jumper = cc.Sprite.extend({
    ctor: function( x, y ) {
        this._super();
        this.initWithFile( 'res/images/jumper.png' );

        this.x = x;
        this.y = y;

        this.maxVx = 8;
        this.accX = 0.25;
        this.backAccX = 0.5;
        this.jumpV = 20;
        this.g = -1;
        
        this.vx = 0;
        this.vy = 0;

        this.moveLeft = false;
        this.moveRight = false;
        this.jump = false;

        this.updatePosition();
    },

    updatePosition: function() {
        this.setPosition( cc.p( Math.round( this.x ),
                                Math.round( this.y ) ) );
    },

    update: function() {
        this.updateXMovement();
        this.updateYMovement();
        this.updatePosition();
    },

    updateXMovement: function() {
        if ( this.y == 200 ) {
            if ( ( !this.moveLeft ) && ( !this.moveRight ) ) {
                this.autoDeaccelerateX();
            } else if ( this.moveRight ) {
                this.accelerateX( 1 );
            } else {
                this.accelerateX( -1 );
            }
        }
        this.x += this.vx;
        if ( this.x < 0 ) {
            this.x += screenWidth;
        }
        if ( this.x > screenWidth ) {
            this.x -= screenWidth;
        }
    },

    updateYMovement: function() {
        if ( this.jump ) {
            if ( this.y == 200 ) {
                this.vy = this.jumpV;
            }
        }
        this.vy += this.g;
        this.y += this.vy;
        if ( this.y < 200 ) {
            this.y = 200;
            this.vy = 0;
        }
    },
    
    accelerateX: function( dir ) {
        var sameDirection = (( this.vx * dir ) >= 0);

        if ( sameDirection ) {
            this.vx += dir * this.accX;
            if ( Math.abs( this.vx ) > this.maxVx ) {
                this.vx = dir * this.maxVx;
            }
        } else {
            if ( Math.abs( this.vx ) >= this.backAccX ) {
                this.vx += dir * this.backAccX;
            } else {
                this.vx = 0;
            }
        }
    },
    
    autoDeaccelerateX: function() {
        if ( Math.abs( this.vx ) < this.accX ) {
            this.vx = 0;
        } else if ( this.vx > 0 ) {
            this.vx -= this.accX;
        } else {
            this.vx += this.accX;
        }
    },
    
    handleKeyDown: function( e ) {
        if ( Jumper.KEYMAP[ e ] != undefined ) {
            this[ Jumper.KEYMAP[ e ] ] = true;
        }
    },

    handleKeyUp: function( e ) {
        if ( Jumper.KEYMAP[ e ] != undefined ) {
            this[ Jumper.KEYMAP[ e ] ] = false;
        }
    }
});

Jumper.KEYMAP = {}
Jumper.KEYMAP[cc.KEY.left] = 'moveLeft';
Jumper.KEYMAP[cc.KEY.right] = 'moveRight';
Jumper.KEYMAP[cc.KEY.up] = 'jump';
        
