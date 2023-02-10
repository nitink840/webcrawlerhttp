function normalizeURL(urlString) {
    const urlObj= new URL(urlString);
    if(urlObj.pathname.endsWith('/'))
        return urlObj.host + urlObj.pathname.slice(0,-1);
    else
        return urlObj.host + urlObj.pathname;
}

// console.log(normalizeURL('https://boot.dev/path/'));
module.exports={
    normalizeURL
}