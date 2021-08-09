var pageNames = ["hi", "how", "who"];
var work = ["topforms", "parsafix", "klantenhuis", "ggzopweg", "jam"];
var skills = {
    "languages": ["JavaScript", "TypeScript", "HTML", "CSS", "Java", "Kotlin", "Python", "C#", "GDScript", "PHP"],
    "other": ["Cordova", "Ionic", "Angular", "React.js", "Vue.js", "Node.js", "Godot", "MySQL", "SQLite", "Git", "Docker"],
    "design": ["Photoshop", "Illustrator", "Animate/Flash"]
};
var varNames = ["whatImGoodAt", "whatIveWorkedWith", "myToolKit", "whatMakesTheWorldGoRound"];
var varNameIndex = 0;
var mousePos = {x: -1, y: -1}
var curPage;
var viewingWork = false;
var deleteSpeed = 100;
var typeSpeed = 250;
var dotColor;

for (let i = 0; i < work.length; i++) 
{
    pageNames.splice(1 + i, 0, work[i]);
}

window.addEventListener("load", function()
{
    curPage = window.location.href;

    setup();

    for (const skillSet in skills) 
    {
        for (let i = 0; i < skills[skillSet].length; i++) 
        {
            $("#skills").append('<div class="skill skill-' + skillSet + '">' + skills[skillSet][i] + '</div>');
        }
    }

    var x = 0;
    $(".skill").each(function()
    {
        if (x != $(".skill").length - 1)
        {
            $(this).html($(this).html() + '<div class="comma">,</div>');
        }
        x++;
    });

    varAnimation();
});

function setup()
{
    if (window.innerWidth > 1815)
    {
        $("#introduction").html("I'm Noah Voogd, a 26 year old creative developer<br>living in Utrecht, the Netherlands.")
    }
    else
    {
        $("#introduction").html("I'm Noah Voogd, a 26 year old creative developer living in Utrecht, the Netherlands.")
    }

    $(".work-text-container").each(function()
    {
        //console.log(window.innerHeight, "calc(50% -" + $(this).height(), (window.innerHeight - $(this).height()) / 2 + ")");
        $(this).css("top", "calc(50% -" + ((window.innerHeight - $(this).height()) / 2) + ")");
    });

    var tabletHeight = $(".device-container.tablet").height();

    if ($(".device-container.tablet").height() / $(".device-container.tablet").width() > 1.558)
    {
        tabletHeight = $(".device-container.tablet").width() * 1.558;
    }

    var tabletArrowTop = $(".device-container.tablet").height() - (($(".device-container.tablet").height() - tabletHeight) / 2) - (0.08 * tabletHeight);
    $(".tablet .back-arrow, .tablet .forward-arrow").css({
        "margin-top": tabletArrowTop + "px",
        "height": 0.05 * tabletHeight
    });

    var laptopHeight = $(".device-container.laptop").height();

    if ($(".device-container.laptop").height() / $(".device-container.laptop").width() > 0.649)
    {
        laptopHeight = $(".device-container.laptop").width() * 0.649;
    }

    var laptopArrowTop = $(".device-container.laptop").height() - (($(".device-container.laptop").height() - laptopHeight) / 2) - (0.205 * laptopHeight);
    $(".laptop .back-arrow, .laptop .forward-arrow").css({
        "margin-top": laptopArrowTop + "px",
        "height": 0.052 * laptopHeight
    });
}

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
}

function windowResize() 
{
    document.getElementById('landing-page-canvas').width  = window.innerWidth;
    document.getElementById('landing-page-canvas').height = window.innerHeight;
    setup();
};
  
window.addEventListener('resize', windowResize);

$("#who-click").click(function()
{
    window.location.href = '/#who';
});

$("#what-click").click(function()
{
    window.location.href = '/#topforms';
});

$('.dots a').hover(function()
{
    var title = $(this).attr('href').replace('#', '');
    var pageTag = curPage.split('#')[1];

    if ($(this).parent().find('.dot-title').length == 0)
    {
        var titleClass = "dot-title";
        if (work.indexOf(title) > -1)
        {
            titleClass += " work-dot-title";
        }

        if (title == "topforms")
        {
            $(this).parent().append('<a id="what-title" class="dot-title" href="' + $(this).attr('href') + '">what</a>');
        }
        else
        {
            $(this).parent().append('<a class="' + titleClass + '" href="' + $(this).attr('href') + '">' + title + '</a>');
        }

        $(this).parent().find(".dot-title").css("color", dotColor);
    }

    if (work.indexOf(pageTag) > -1)
    {
        $('#what-title').css("margin-top", "-44px");
    }
    else
    {
        $('#what-title').css("margin-top", "-28px");
    }
},
function()
{
    setTimeout(() => 
    {
        $(this).parent().find('.dot-title').remove();  
    }, 150);
});

function adjustDotColor()
{
    setTimeout(function() {
        dotColor = "#fafafa";

        if (curPage.endsWith('#who'))
        {
            dotColor = "#333333";   
        }
        else if (curPage.endsWith("#ggzopweg"))
        {
            dotColor = "#5199FF";
        }

        $(".dots li a").css("background-color", "transparent");
        $(".dots li a.active").css("background-color", dotColor);
        $(".dots li a").css("color", dotColor);
        $(".dots li a").css("border-color", dotColor);
        $(".dot-connector").css("background-color", dotColor);
    }, 300);
}

function showWork()
{
    var tag = curPage.split('#');
    tag = tag[tag.length - 1];

    //If we're on a work page
    if (work.indexOf(tag) > -1)
    {
        if ($('#topforms-work-dot').length == 0)
        {
            $('<a href="#topforms" id="topforms-work-dot" class="work-dot"></a>').insertAfter('#what-dot');
            $('<a id="topforms-title" class="dot-title-extra work-dot-title">topforms</a>').insertAfter('#topforms-work-dot');
            setTimeout(() => 
            {
                $(".work-dot").each(function()
                {
                    $('<div class="dot-connector"></div>').insertAfter(this);
                    $(".dot-connector").css("background-color", dotColor);
                });
            }, 350);

            $('#topforms-work-dot').hover(function()
            {
                $("#topforms-title").show();
            },
            function()
            {
                setTimeout(() => 
                {
                    $("#topforms-title").hide();
                }, 150);
            });
        }
        
        setTimeout(() => 
        {
            $(".work-dot").css("display", "block");
            $("#what-dot").css("background-color", "#fafafa");
            $('.work-dot').each(function()
            {
                if ($(this).attr("id") == "topforms-work-dot")
                {
                    if (tag == "topforms")
                    {
                        $("#topforms-work-dot").css("background-color", "#fafafa");
                    }
                }
            })
        }, 350);
    }
    else
    {
        setTimeout(() => 
        {
            $("#what-dot").css("background-color", "transparent");
            $("#topforms-work-dot").remove();
            $('.dot-connector').remove();
            $(".work-dot").hide();
        }, 100);
    }
}

window.addEventListener('popstate', function()
{
    curPage = window.location.href;

    adjustDotColor();
    showWork();
});

function varAnimation()
{
    setTimeout(() => 
    {
        if (curPage.endsWith("#how"))
        {
            setTimeout(() => 
            {
                varNameIndex++;
                if (varNameIndex == varNames.length)
                {
                    varNameIndex = 0;
                }

                deleteLetter(varNames[varNameIndex], function()
                {
                    setTimeout(() => 
                    {
                        addLetter(varNames[varNameIndex], function()
                        {
                            varAnimation();
                        });
                    }, typeSpeed);
                });
            }, deleteSpeed);
        }
        else
        {
            varAnimation();
        }
    }, 3500);
}

function deleteLetter(newText, callback)
{
    var curVarName = $("#var-name").html();
    var newVarName = curVarName.substr(0, curVarName.length - 1);

    if (newText.substr(0, curVarName.length) != curVarName)
    {
        $("#var-name").html(newVarName);
    }
    else
    {
        callback();
        return;
    }

    if (newVarName.length > 0)
    {
        setTimeout(() => 
        {
            deleteLetter(newText, callback);
        }, deleteSpeed);
    }
    else
    {
        callback();
    }
}

function addLetter(newText, callback)
{
    var curVarName = $("#var-name").html();
    var newVarName = curVarName + newText.substr(curVarName.length, 1);
    $("#var-name").html(newVarName);

    if (newVarName.length < newText.length)
    {
        setTimeout(() => 
        {
            addLetter(newText, callback);
        }, typeSpeed);
    }
    else
    {
        callback();
    }
}