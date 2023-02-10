const {normalizeURL} = require('../src/crawl');
const {test, expect} = require('@jest/globals');

test('normalizeURL strip http',()=>{
    const actual = normalizeURL('https://boot.dev/path/');
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
    const actual = normalizeURL('https://boot.dev/path/');
    const expected = 'boot.dev/path';
    expect(actual).toEqual(expected);
})