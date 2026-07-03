//forwards request to origin server
const cache = require('./cache');

async function forwardRequest(req,res,origin) {
    const key = `${req.method}:${req.url}`

    if(cache.has(key)) {
        const cached = cache.get(key);

        res.statusCode = cached.status;

        for (const [k, v] of Object.entries(cached.headers)) {
            if (k.toLowerCase() !== "content-encoding") {
                res.setHeader(k, v);
            }
        }

        res.setHeader("X-Cache", "HIT");
        return res.end(cached.body);
    }
    const targetURL = origin + req.url
    const response = await fetch(targetURL, {
        method: req.method,
        headers: {
            ...req.headers,
            "accept-encoding":"identity"
        }
    });

    const body = await response.text();
        const blockedHeaders = new Set([
        "content-encoding",
        "transfer-encoding",
        "content-length"
    ]);
    
    cache.set(key, {
        status: response.status,
        headers: Object.fromEntries(
            [...response.headers].filter(([k]) => !blockedHeaders.has(k.toLowerCase()))),
        body
    });

    res.statusCode = response.status;
    res.setHeader("X-Cache", "MISS");

    response.headers.forEach((value, key) => {
        if (!blockedHeaders.has(key.toLowerCase())) {
            res.setHeader(key, value);
        }
    });
    res.end(body);
}
module.exports={forwardRequest};
