#!/usr/bin/env node

//reads --port, --origin and --clear-cache

const args = process.argv.slice(2);

//checks both flag and value exist
function getArg(flag) {
    const index = args.indexOf(flag);
    if(index !== -1 && args[index + 1]) {
        return args[index + 1];
    }
    return null;
}

const {startServer} = require('../src/server')
const port = getArg('--port');
const origin = getArg('--origin');
const clearCache = args.includes('--clear-cache');

if(clearCache) {
    //just to check its working later need to clear cache and exit program
    console.log('cache cleared');
}
else if(port && origin) {
    if(Number.isInteger(Number(port))){ 
        startServer(port, (req, res) => {
            console.log(req.method, req.url);
            res.end("OK");
        });
    }
    else {
        console.log(`Error: '${port}' is not a valid port number.`);
    }
}
else {
    console.log('Error: missing --port or --origin');
}