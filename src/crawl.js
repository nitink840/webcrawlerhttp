const {JSDOM} = require('jsdom');
let count =0;
 async function crawlPage(baseUrl,currentUrl,pages) {
    const baseUrlObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);
    if(baseUrlObj.hostname !== currentUrlObj.hostname){
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentUrl);
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }
    
    pages[normalizedCurrentURL] = 1

    console.log(`Actively crawling ${currentUrl}`)
    // let htmlBody='';
    try {
        const resp = await fetch(currentUrl);

        if(resp.status > 399){
            console.log(`error in fetch with status code ${resp.status} on page ${currentUrl}`)
            return pages
        }

        const contentType = resp.headers.get('content-type');
        if(!contentType.includes("text/html")){
            console.log(`non-html response, content type: ${contentType} on page ${currentUrl}`)
            return pages
        }

        const htmlBody = await resp.text()
        const nextUrls = urlFromHtml(htmlBody,baseUrl)
        for (const nextUrl of nextUrls) {
            pages = await crawlPage(baseUrl,nextUrl,pages)
        }
        
    }catch (error) {
        console.log(`Error in fetch: ${error.message} on page: ${currentUrl}`)
    }
    
    return pages
}

function urlFromHtml(htmlBody,baseUrl) {
    const urls=[];
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll("a");
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
    urlFromHtml,
    crawlPage
}