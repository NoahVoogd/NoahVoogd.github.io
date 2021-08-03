
var pageNames = ["hi", "why", "what_code", "what_art", "how", "who"];
var mousePos = {x: -1, y: -1}

activateScroll();

function activateScroll()
{
    new fullScroll({
        mainElement: "main",
        displayDots: true,
        dotsPosition: "left",
        animateTime: 0.7,
        animateFunction: "ease",
    });
}

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    console.log("scroll");
});

document.onmousemove = handleMouseMove;

function handleMouseMove(event) 
{
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    mousePos.x = event.pageX;
    mousePos.y = event.pageY;

    if (curPage == 0)
    {
        handleHiThereMouse();
    }
}

function handleHiThereMouse()
{
    var hover = false;

    var hiHeight = window.innerWidth * 0.5 * 0.43;

    var whoX = window.innerWidth * 0.5 * 0.38 + window.innerWidth * 0.25;
    var whoHeight = hiHeight * 0.37;
    var whoWidth = window.innerWidth * 0.5 * 0.62;
    var whoY = window.innerHeight * 0.5 - hiHeight * 0.12;

    if ((mousePos.x > whoX && mousePos.y > whoY) && (mousePos.x < whoX + whoWidth && mousePos.y < whoY + whoHeight))
    {
        //$("#who").css("background-image", 'url("imgs/landing_page/who.svg")');
        hover = true;
    }
    else
    {
        //$("#who").css("background-image", 'url("imgs/landing_page/noah.svg")');
    }

    var whatX = window.innerWidth * 0.5 * 0.60 + window.innerWidth * 0.25;
    var whatHeight = hiHeight * 0.10;
    var whatWidth = window.innerWidth * 0.5 * 0.19;
    var whatY = window.innerHeight * 0.5 + hiHeight * 0.40;

    if ((mousePos.x > whatX && mousePos.y > whatY) && (mousePos.x < whatX + whatWidth && mousePos.y < whatY + whatHeight))
    {
        //$("#what").css("background-image", 'url("imgs/landing_page/what.svg")');
        hover = true;
    }
    else
    {
        //$("#what").css("background-image", 'url("imgs/landing_page/things.svg")');
    }

    if (hover)
    {
        $("body").css("cursor", "pointer");
    }
    else
    {
        $("body").css("cursor", "initial");
    }

    hover = false;
}

function windowResize() 
{
    document.getElementById('landing-page-canvas').width  = window.innerWidth;
    document.getElementById('landing-page-canvas').height = window.innerHeight;
};
  
window.addEventListener('resize', windowResize);