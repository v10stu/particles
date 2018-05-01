(() => {
    var dom = document.querySelector('canvas'),
    width = dom.getAttribute('width'),
    height = dom.getAttribute('height'),
    mp = Math.PI,
    x = 0,
    speed = 20,
    target = 400;

    if(!dom || !dom.getContext('2d')){return;}
    var ctx = dom.getContext('2d');

    (function(w,r){
        w['r'+r] = w['r'+r] ||
        w['webkitR'+r] ||
        w['mozR'+r] ||
        w['oR'+r] ||
        w['msR'+r] ||
        function(callback){w.setTimeout(callback,1000/60);};
    })(window,'equestAnimationFrame');


    var Particle = function(s,c,sp){
        this.scale = s,
        this.color = c,
        this.speed = sp,
        this.position = {
            x:-(this.scale),
            y:height / 2
        };
    };


    Particle.prototype = {
        draw:function(){
            ctx.beginPath();
            ctx.arc(this.position.x,this.position.y,this.scale,0,2*mp);
            ctx.fillStyle = this.color;
            ctx.fill();
        },
        loop:function(){
            ctx.clearRect(0,0,width,height);
            this.position.x += this.speed;
            this.draw();
            if(this.position.x - this.scale > width) this.position.x = -(this.scale);
        },
        multi:function(){
            this.position.x += this.speed;
            this.draw();
            if(this.position.x - this.scale > width) this.position.x = -(this.scale);
        }
    };

    var density = 100,
        particles = [],
        colors = ['red','blue','yellow'],
        scale = 0;

    for(var i = 0;i < density;i++){
        scale = Math.random()*(12-3)+3|0;
        particles[i] = new Particle(scale,colors[(Math.random()*3|0)],(scale / 2 |0));
        particles[i].position.x = width * Math.random();
        particles[i].position.y = height * Math.random();
    }


    var loopStart = function(){
        var i = 0;
        ctx.clearRect(0,0,width,height);

        while(i < particles.length){
            particles[i].multi();
            i = (i+1)|0;
        }
        window.requestAnimationFrame(loopStart);
    };

    loopStart();


})();
