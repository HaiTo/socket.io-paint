$(function(){

	var canvas = document.getElementById('mycanvas');
	var context = canvas.getContext('2d');

	context.lineWidth = 3;
	context.lineCap = 'round';
	var penColor = '#'+Math.floor(Math.random()*0xFFFFFF).toString(16);

	var positioning = null;
	var drawing = false;

	canvas.onmousedown = function(event) {
		positioning = {x: event.pageX, y: event.pageY};
		drawing = true;
	};
	canvas.onmousemove = function(event) {
		if (drawing == true) {
			drawLine(event);
		}
	};
	canvas.onmouseup = function(event) {
		drawLine(event);
		drawing = false;
	};
	canvas.onmouseover = function(event) {
		drawing = false;
	};

	function drawLine(event) {
		var positions = {x: event.pageX, y: event.pageY};
		var points = {
			x: positions.x,
			y: positions.y,
			xp: positioning.x,
			yp: positioning.y,
			color: penColor
		};
		paint.json.emit('paint points', points);
		painting(points);
		positioning = points;
	}

	function painting(points) {
		context.strokeStyle = points.color;
		context.beginPath();
		context.moveTo(points.x, points.y);
		context.lineTo(points.xp, points.yp);
		context.stroke();
		context.closePath();
	}
	var paint = new io.connect();
	paint.on('paint points', function(points) {
		painting(points);
		console.log(points);
	});
});