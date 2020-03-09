var cvs = document.getElementById("canvas");

var con = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipe1 = new Image();
var pipe2 = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipe1.src = "img/pipe1.png";
pipe2.src = "img/pipe2.png";

document.addEventListener("keydown",moveup);

function moveup()
{
	by -= 25;
}

var pipe = [];

pipe[0] = {

	x : cvs.width,
	y : 0
}

var gravity = 1.5;
var bx = 25;
var by = 150;
var gap = 350;
var constant = pipe1.height + gap;
var score = 0;

function draw()
{
	con.drawImage(bg,0,0);

	for(var i =0; i<pipe.length; i++)
	{
		con.drawImage(pipe1, pipe[i].x ,pipe[i].y);

		con.drawImage(pipe2, pipe[i].x , pipe[i].y + constant);

		pipe[i].x--;

		if(pipe[i].x == 125)
	{
		pipe.push({

			x : cvs.width,
			y : Math.floor(Math.random() * pipe1.height) - pipe1.height

		});		

	}

	if(pipe[i].x == 5)
	{
		score++;
	}

		//game over logic
	if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipe1.width && (by <= pipe[i].y + pipe1.height 
		|| by + bird.height >= pipe[i].y + constant) 
		|| by + bird.height >= cvs.height - fg.height)
	{
		location.reload();
	}

	}

	con.drawImage(fg,0,cvs.height-fg.height);

	con.drawImage(bird,bx,by,50,50);

	con.fillStyle = "#000";
	con.font = "20px Ariel"

	con.fillText("Score: "+score,10,20);

	by += gravity;

	requestAnimationFrame(draw);
}

draw();
