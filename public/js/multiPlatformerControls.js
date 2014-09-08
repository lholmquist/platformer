
Quintus.MyInput = function(Q) {
/**
   * Platformer Control Component
   *
   * Adds 2D platformer controls onto a Sprite
   *
   * Platformer controls bind to left, and right and allow the player to jump.
   *
   * Adds the following properties to the entity to control speed and jumping:
   *
   *      {
   *        speed: 200,
   *        jumpSpeed: -300
   *      }
   *
   *
   * @class platformerControls
   * @for Quintus.Input
   */
  Q.component("multiPlatformerControls", {
    defaults: {
      speed: 200,
      jumpSpeed: -300,
      collisions: []
    },

    added: function() {
      var p = this.entity.p;

      Q._defaults(p,this.defaults);

      this.entity.on("step",this,"step");
      this.entity.on("bump.bottom",this,"landed");

      p.landed = 0;
      p.direction ='right';
    },

    landed: function(col) {
      var p = this.entity.p;
      p.landed = 1/5;
    },

    step: function(dt, name) {
      var p = this.entity.p;

      if(p.ignoreControls === undefined || !p.ignoreControls) {
        var collision = null;

        // Follow along the current slope, if possible.
        if(p.collisions !== undefined && p.collisions.length > 0 && ((Q.inputs[p.name+'left'] && Q.inputs[p.name+'left'].active) || (Q.inputs[p.name+'right'] && Q.inputs[p.name+'right'].active) || p.landed > 0)) {
          if(p.collisions.length === 1) {
            collision = p.collisions[0];
          } else {
            // If there's more than one possible slope, follow slope with negative Y normal
            collision = null;

            for(var i = 0; i < p.collisions.length; i++) {
              if(p.collisions[i].normalY < 0) {
                collision = p.collisions[i];
              }
            }
          }

          // Don't climb up walls.
          if(collision !== null && collision.normalY > -0.3 && collision.normalY < 0.3) {
            collision = null;
          }
        }

        if(Q.inputs[p.name+'left'] && Q.inputs[p.name+'left'].active && Q.inputs[p.name+'left'].name === p.name) {
          p.direction = 'left';
          if(collision && p.landed > 0) {
            p.vx = p.speed * collision.normalY;
            p.vy = -p.speed * collision.normalX;
          } else {
            p.vx = -p.speed;
          }
        } else if(Q.inputs[p.name+'right'] && Q.inputs[p.name+'right'].active && Q.inputs[p.name+'right'].name === p.name) {
          p.direction = 'right';
          if(collision && p.landed > 0) {
            p.vx = -p.speed * collision.normalY;
            p.vy = p.speed * collision.normalX;
          } else {
            p.vx = p.speed;
          }
        } else {
          p.vx = 0;
          if(collision && p.landed > 0) {
            p.vy = 0;
          }
        }

        if(p.landed > 0 && ((Q.inputs[p.name+'up'] && Q.inputs[p.name+'up'].active) || Q.inputs['action']) && !p.jumping) {
          p.vy = p.jumpSpeed;
          p.landed = -dt;
          p.jumping = true;
        } else if((Q.inputs[p.name+'up'] && Q.inputs[p.name+'up'].active) || Q.inputs['action']) {
          this.entity.trigger('jump', this.entity);
          p.jumping = true;
        }

        if(p.jumping && !((Q.inputs[p.name+'up'] && Q.inputs[p.name+'up'].active) || Q.inputs['action'])) {
          p.jumping = false;
          this.entity.trigger('jumped', this.entity);
          if(p.vy < p.jumpSpeed / 3) {
            p.vy = p.jumpSpeed / 3;
          }
        }
      }
      p.landed -= dt;
    }
  });
};
