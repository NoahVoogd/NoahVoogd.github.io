const http = require('http');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

var fileList;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout});

//-------------------------------------------------------------------------------
// On terminal input C^
//-------------------------------------------------------------------------------
rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit? (y/n) ', (answer) => 
    {
        switch (answer) {
            case 'y':
                stop();
                break;
            case 'r':
                stop();
                start();
                break;
        }
    });
});

//-------------------------------------------------------------------------------
// Get the data of all the files in the given array
//-------------------------------------------------------------------------------
function readFiles(results, curIndex, callback)
{
    readFile(results[curIndex], function(data)
    {
        var wwwIndex = results[curIndex].indexOf("www");
        var fileName = results[curIndex].substr(wwwIndex + 3, results[curIndex].length - 1).replaceAll('\\', '/');

        fileList[fileName] = data;

        if (curIndex < results.length - 1)
        {
            curIndex++;
            readFiles(results, curIndex, callback);
        }
        else
        {
            callback();
        }
    })
}

//-------------------------------------------------------------------------------
// Get the data of a single file
//-------------------------------------------------------------------------------
function readFile(dir, callback) 
{
    fs.readFile(dir, function(err, data) 
    {
        if (err) { console.log("\nFile read error: " + err); }
        callback(data);
    }.bind(this));
}

//-------------------------------------------------------------------------------
// Walk through the given directory and return the files
//-------------------------------------------------------------------------------
function walk(dir, done) 
{
    var results = [];
    fs.readdir(dir, function(err, list) 
    {
        if (err) return done(err);
        var i = 0;
        (function next() 
        {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) 
            {
                if (stat && stat.isDirectory()) 
                {
                    walk(file, function(err, res) 
                    {
                        results = results.concat(res);
                        next();
                        });
                } 
                else 
                {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

//-------------------------------------------------------------------------------
// Starts up HTTP server
//-------------------------------------------------------------------------------
function start()
{ 
    fileList = {};
   
    walk('./', function(err, results)
    {
        if (!err)
        {
            readFiles(results, 0, function()
            {
                launch();
            });
        }
    });
}

//-------------------------------------------------------------------------------
// Launch the server
//-------------------------------------------------------------------------------
function launch()
{
    rl.resume();
    server = http.createServer(requestListener);
    server.listen(38101, function()
    {
        console.log('Server listening to %j', server.address());
    });
}

//-------------------------------------------------------------------------------
// Stops HTTP server
//-------------------------------------------------------------------------------
function stop()
{
    //Close the server
    server.close();
    rl.pause();
    console.log("Exit?");
}

//-------------------------------------------------------------------------------
// Listens for HTTP requests and responds
//-------------------------------------------------------------------------------
function requestListener(req, res)
{
    switch (req.url) {        
        case '/':
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(fileList['/index.html']);
            break;
        
        default:
            if (req.url.endsWith('.svg'))
            {
                res.writeHead(200, {"Content-Type": "image/svg+xml"});
            }
            else
            {
                res.writeHead(200);
            }

            res.end(fileList[req.url]);

            
            break;
    }
}

start();