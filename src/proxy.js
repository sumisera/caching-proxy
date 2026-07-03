//forwards request to origin server
async function forwardRequest(req,res,origin) {
    const targetURL = origin + req.url
    const response = await fetch(targetURL, {
        method: req.method,
        headers: req.headers
    });

    const body = await response.text();

    res.statusCode = response.status;
    
    response.headers.forEach((value, key) => {
        res.setHeader(key, value);
    });
    res.end(body);
}
module.exports={forwardRequest};
