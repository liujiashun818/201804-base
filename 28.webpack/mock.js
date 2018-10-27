function mock(app) {
    app.get('/api/user', function (req, res) {
        res.json({ id: 1, name: 'before-zfpx1' });
    });
}
module.exports = mock;