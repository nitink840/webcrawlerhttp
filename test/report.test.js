const {test, expect} = require('@jest/globals')
const {report} = require('../src/printReport')

test('pages report',()=>{
    const input = {
        'wagslane.dev/tags/management':2,
        'wagslane.dev/tags/philosophy':3,
        'wagslane.dev/tags/orkut':7,
        'wagslane.dev/tags/poper':23,
        'wagslane.dev/tags/agile':20,
        'wagslane.dev/tags/power':13,
    };
    const actual = report(input)
    const expected = [
        [ 'wagslane.dev/tags/poper', 23 ],
        [ 'wagslane.dev/tags/agile', 20 ],
        [ 'wagslane.dev/tags/power', 13 ],
        [ 'wagslane.dev/tags/orkut', 7 ],
        [ 'wagslane.dev/tags/philosophy', 3 ],
        [ 'wagslane.dev/tags/management', 2 ],
    ];
    expect(actual).toEqual(expected)
})