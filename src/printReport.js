function printReport(sortedPages) {
    console.log("============")
    console.log("REPORT START")
    console.log("============")
    for (const url in sortedPages) {
        let link = sortedPages[url][0]
        let hits = sortedPages[url][1]
        console.log(`Found ${hits} internal links to ${link}`)
    }
    console.log("============")
    console.log(" REPORT END")
    console.log("============")
}

function sortPages (pages){
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a,b)=>b[1]-a[1]);
    return pagesArray
}

module.exports={
    sortPages,
    printReport
}