const {normalizeURL, urlFromHtml} = require('../src/crawl');
const {test, expect} = require('@jest/globals');

test('normalizeURL strip http',()=>{
    const actual = normalizeURL('http://boot.dev/path/');
    const expected = 'boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL strip protocol',()=>{
    const actual = normalizeURL('https://boot.dev/path');
    const expected = 'boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL strip trailing slash',()=>{
    const actual = normalizeURL('https://boot.dev/path/');
    const expected = 'boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL lower Capitals',()=>{
    const actual = normalizeURL('https://BOOT.dev/path/');
    const expected = 'boot.dev/path';
    expect(actual).toEqual(expected);
})

test('urlsFromHTML absolute',()=>{
    const htmlBody =`
    <html>
        <body>
            <a href="https://blog.boot.dev/path">
                Blog boot.dev
            </a>
        </body>
    </html>`;
    const actual = urlFromHtml(htmlBody,"https://blog.boot.dev/path");
    const expected = ["https://blog.boot.dev/path"];
    expect(actual).toEqual(expected);
})

test('urlsFromHTML relative',()=>{
    const htmlBody =`
    <html>
        <body>
            <a href="/path">
                Blog boot.dev
            </a>
        </body>
    </html>`;
    const actual = urlFromHtml(htmlBody,"https://blog.boot.dev");
    const expected = ["https://blog.boot.dev/path"];
    expect(actual).toEqual(expected);
})

test('urlsFromHTML both',()=>{
    const htmlBody =`
    <html>
        <body>
            <a href="https://blog.boot.dev/path1">
                Blog boot.dev1
            </a>
            <a href="/path2">
                Blog boot.dev2
            </a>
        </body>
    </html>`;
    const actual = urlFromHtml(htmlBody,"https://blog.boot.dev");
    const expected = ["https://blog.boot.dev/path1","https://blog.boot.dev/path2"];
    expect(actual).toEqual(expected);
})

test('urlsFromHTML invalid',()=>{
    const htmlBody =`
    <html>
        <body>
            <a href="invalid URL">
                Invalid
            </a>
        </body>
    </html>`;
    const actual = urlFromHtml(htmlBody,"https://blog.boot.dev");
    const expected = [];
    expect(actual).toEqual(expected);
})