tool.minDistance = 20;
tool.maxDistance = 100;

var path;
path = new Path();
path.fillColor = '#FC004A';

function onMouseMove(event) {
	var step = event.delta / 2;
	step.angle += 90;
	
	var top = event.middlePoint + step;
	var bottom = event.middlePoint - step;
	
	path.add(top);
	path.insert(0, bottom);
	path.smooth();
}

function onMouseUp(event) {
	path.add(event.point);
	path.closed = true;
	path.smooth();
}