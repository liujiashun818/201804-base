let compile = require('./compile');
test('测试text-loader', async function () {
    let texture= 'example.txt';
    let name = 'zfpx';
    let Stats = await compile(texture,name);
    let ret = Stats.toJson();
    let source = ret.modules[0].source;
    expect(source).toBe(`module.exports = "hello ${name}"`);
});