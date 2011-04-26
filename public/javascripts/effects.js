
function setupFWBoard() {
    var num_fw = 3;

    var canvas = $('#fw')[0];
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    fireworks = [];

    console.log("adding fireworks");
    for (var i = 0; i < num_fw; i++ ) {
	setTimeout( addFireworks(ctx, fireworks), 200);
    }
    console.log("done adding fireworks:" + fireworks.length);

    var cnt = 0;
    var interval_id = setInterval(function () { cnt ++ ; updateDisplay(ctx, canvas.width, canvas.height, fireworks, cnt); }, 300);

    setTimeout( stopFireworks(fireworks, interval_id), 1000); 
}

function stopFireworks(fireworks, interval_id) {
    console.log("Fireworks cnt: " + fireworks.length) ;
    if (fireworks.length === 0) {
	clearInterval(interval_id);
	console.log("Fireworks stopped") ;
	return;
    }
    else {
	setTimeout( stopFireworks(fireworks, interval_id), 1000); 
    }
}


function addFireworks (ctx, fireworks) {

    var targetx = 100;
    targetx = targetx / 2;
    var targety = 100;
    targety = ((10-targety) / 100) + 3.5;

    var fw = fireworks[fireworks.length] = new Firework(fireworks.length);
    fw.x = 125 ; // middle
    fw.dx = targetx;
    fw.dy = targety;
    fw.status = 1;

    console.log("added a firework");
}


function updateDisplay(ctx, canvaswidth, canvasheight, fireworks, cnt) {
    console.log("updating display - " + cnt);
    ctx.clearRect(0, 0, canvaswidth, canvasheight);
    for (var i=0; i < fireworks.length; i++ ) {
	if (fireworks[i] == null) continue;
	displayFirework(fireworks, fireworks[i], ctx, canvasheight);
    }
    console.log("updated display complete");
}

function displayFirework(fireworks, fw, ctx, canvasheight) {
    console.log('START updating firework '+ fw.index);
    if (fw.y < 0 ) {
	console.log('gone firework '+ fw.index);
	fireworks[fw.index] = null;
    }
    if (fw.status === 2) { //firework_exploded
	console.log('exploded firework '+ fw.index);
	ctx.beginPath();
	ctx.fileStyle = 'rgb(200,200,200)';
	ctx.arc(fw.x, canvasheight - fw.y, 3, 0, Math.PI * 2, true);
	ctx.fill();
    }
    fw.color = "rgb(80, 80, 80)";
    ctx.strokeStyle = fw.color;
    var forces = {x:0, y:-.05};
    
    if (fw.status === 3) {
	console.log('fragment firework '+ fw.index);
	forces.y = -.02;
	fw.color = "rgb("+ Math.round(fw.r*fw.brightness) +", "+ Math.round(fw.g*fw.brightness) +", "+ Math.round(fw.b*fw.brightness) +")";
        ctx.strokeStyle = fw.color;
        fw.brightness -= 5;
        if (fw.brightness < 0) {
	    console.log('fragment removed '+ fw.index);
	    fireworks[fw.index] = null;
	}
    }
    if (fw.dy < -1 && fw.status == 1) {
	console.log('explode firework '+ fw.index);
        explodeFirework(fireworks, fw, ctx);
    }
    fw.start = {x:fw.x, y:fw.y};
    //apply accelerations
    fw.dx += forces.x * 2;
    fw.dy += forces.y * 2;
    //apply velocities
    fw.x  += fw.dx * 2;
    fw.y  += fw.dy * 2;
    //show
    if (fw.previous) {
	console.log('moving firework '+ fw.index);
        ctx.beginPath();
        ctx.moveTo(fw.previous.x, this.canvasheight-fw.previous.y);
        ctx.lineTo(fw.x, this.canvasheight-fw.y);
        ctx.stroke();
        ctx.closePath();
    }
    console.log('END - firework setting position '+ fw.index);
    fw.previous = {x:fw.start.x, y:fw.start.y};
}

function explodeFirework (fireworks, fw, ctx) {
    fw.status = 2;
    fw.r = (Math.random() /2) + 0.5;
    fw.g = (Math.random() /2) + 0.5;
    fw.b = (Math.random() /2) + 0.5;
    fw.brightness = 200;
    ctx.strokeStyle = "rgb(200, 200, 200)";
    // add the fragments
    var frags = Math.random() * 30;
    for (var i = 0; i < frags; i++) { 
        var spark = fireworks[fireworks.length] = new Firework(fireworks.length);
        spark.x = fw.x;
        spark.y = fw.y;
        spark.r = fw.r;
        spark.g = fw.g;
        spark.b = fw.b;
        spark.status = 3;
	spark.dx = Math.random()* 8 * (0.5-Math.random());
        spark.dy = Math.random()* 8 * (0.5-Math.random()) + 1;
    }
}

Firework = function(index) {
    this.index = index;
    this.dx = 0;
    this.dy = 0;
    this.x = 0;
    this.y = 0;
    this.status = 0;
    this.brightness = 255;
    this.r = 1;
    this.g = 1;
    this.b = 1;
    this.start = {x:0, y:0};
    this.previous = 0;
}