const {crawlPage} =  require('./src/crawl');
async function main() {
    if(process.argv.length <3){
        console.log("No argument provided!"); 
        process.exit(1)   
    }
    if(process.argv.length >3){
        console.log("Too many argument provided!"); 
        process.exit(1)   
    }
    const baseUrl = process.argv[2]
    console.log(`Started Crawling ${baseUrl}...`)

    const pages = await crawlPage(baseUrl,baseUrl,{});
    for (const page of Object.entries(pages)) {
        console.log(page)
    }
}

main();