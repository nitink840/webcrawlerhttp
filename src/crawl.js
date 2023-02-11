const {JSDOM} = require('jsdom');

function urlFromHtml(htmlBody,baseUrl) {
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll("a");
    const urls=[];
    for (const link of links) {
        if(link.href.startsWith('/')){
            try {
                const urlObj = new URL(`${baseUrl}${link.href}`);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`Error relative: ${error.message}`)
            }
        }else{
            try {
                const urlObj = new URL(link.href);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`Error absolute: ${error.message}`)
            }
        }
    }
    return urls;
}

function normalizeURL(urlString) {
    const urlObj= new URL(urlString);
    if(urlObj.pathname.endsWith('/'))
        return urlObj.host + urlObj.pathname.slice(0,-1);
    else
        return urlObj.host + urlObj.pathname;
}

// console.log(normalizeURL('https://boot.dev/path/'));
module.exports={
    normalizeURL,
    urlFromHtml
}