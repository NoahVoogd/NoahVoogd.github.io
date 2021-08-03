tool.minDistance = 20;
tool.maxDistance = 100;

var path;
var path2;
var whoMask;
var whatMask;
path = new Path();
path.blendMode = 'source-out';
path.fillColor = '#FC004A';

path2 = new Path();
path2.blendMode = 'destination-in';
path2.fillColor = '#FC004A';

function onMouseMove(event) 
{
	var step = event.delta / 2;
	step.angle += 90;
	
	var top = event.middlePoint + step;
	var bottom = event.middlePoint - step;
	
	path.add(top);
	path.insert(0, bottom);
	path.smooth();

	path2.add(top);
	path2.insert(0, bottom);
	path2.smooth();

	if (whoMask != null)
	{ 
		whoMask.fillColor = 'black';//'#FAFAFA';
	}
	if (whatMask != null)
	{ 
		whatMask.fillColor = 'black';//'#FAFAFA';
	}
}

project.importSVG('/imgs/landing_page/who_mask_transparent.svg', function(mask1) 
{
	whoMask = mask1;

	project.importSVG('/imgs/landing_page/what_mask_transparent.svg', function(mask2) 
	{
		whatMask = mask2;

		posMasks();

		// Bundle everything is a group so the mask can be applied to the content
		var group = new Group({children: [whoMask, path]});
		//var group2 = new Group({children: [whoMask, path2]});

		var group3 = new Group({children: [whatMask, path]});
		//var group4 = new Group({children: [whatMask, path2]});
		
		$('#landing-page-canvas').css("opacity", 1);
	});
});

function posMasks()
{
	try 
	{
		whoMask.bounds.width = document.getElementById("hi-there").clientWidth;
		whoMask.bounds.height = whoMask.bounds.width * 0.436;

		whatMask.bounds.width = whoMask.bounds.width;
		whatMask.bounds.height = whoMask.bounds.height;

		var left = document.getElementById("hi-there").getBoundingClientRect().left;
		var top = document.getElementById("hi-there").getBoundingClientRect().top + ((window.innerHeight * 0.5 - whoMask.bounds.height) / 2);

		var pos = new Point(left + (whoMask.bounds.width / 2), top + (whoMask.bounds.height / 2));
		whoMask.position = pos;
		whatMask.position = pos;
	} 
	catch (error) {}	
}

paper.view.onResize = function(event) 
{
	posMasks();
};