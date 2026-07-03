const fs = require('fs');
const path = require("path");

const filename = path.join(__dirname, "..", "cache.json");
function getCache() {
    if (!fs.existsSync(filename)){
        fs.writeFileSync(filename, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function has(key) {
    const cache = getCache();
    return key in cache;
}

function get(key) {
    const cache = getCache();
    return cache[key];
}

function set(key, value) {
    const cache = getCache();
    cache[key] = value;
    fs.writeFileSync(filename, JSON.stringify(cache));
}

function clear() {
    fs.writeFileSync(filename, JSON.stringify({}));
}

module.exports = {has, get, set, clear};