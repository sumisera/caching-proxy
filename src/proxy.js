//forwards request to origin server
const cache = require('./cache');

async function forwardRequest(req,res,origin) {
    const key = `${req.method}:${req.url}`

    if(cache.has(key)) {
        const cached = cache.get(key);

        res.statusCode = cached.status;

        for (const [k, v] of Object.entries(cached.headers)) {
            res.setHeader(k, v);
        }

        res.setHeader("X-Cache", "HIT");
        return res.end(cached.body);
    }
    const targetURL = origin + req.url
    const response = await fetch(targetURL, {
        method: req.method,
        headers: req.headers
    });

    const body = await response.text();
    cache.set(key, {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body
    });

    res.setHeader("X-Cache", "MISS");
    res.statusCode = response.status;
    
    response.headers.forEach((value, key) => {
        res.setHeader(key, value);
    });
    res.end(body);
}
module.exports={forwardRequest};
