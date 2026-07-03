# Caching Proxy

A  HTTP caching proxy built with Node.js.

This project acts as a proxy server between a client and an origin server. It forwards incoming requests, caches responses and saves cached responses on subsequent requests to reduce unnecessary network calls.

## Features

- Forward HTTP requests to an origin server
- Cache responses using the request method and URL as the cache key
- Return cached responses with `X-Cache: HIT`
- Return new responses with `X-Cache: MISS`
- Preserve response status codes and headers
- Persistent file-based cache (`cache.json`)
- Clear the cache from the command line

---

## Installation

Clone the repository:

```bash
git clone https://github.com/sumisera/CachingProxy.git
cd CachingProxy
```

Install the package locally:

```bash
npm install
npm link
```

---

## Usage

Start the proxy:

```bash
caching-proxy --port 3000 --origin http://dummyjson.com
```



## Clear the Cache

To remove all cached responses:

```bash
caching-proxy --clear-cache
```

## Technologies

- Node.js
- HTTP module
- Fetch API

---

## Future Improvements

- Cache expiration (TTL)

