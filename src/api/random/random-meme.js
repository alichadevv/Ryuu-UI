const axios = require('axios');

module.exports = function (app) {
    app.get('/random/meme', async (req, res) => {
        try {
            const apiUrl = 'https://zenzxz.dpdns.org/search/pinterest?q=meme+indo+lucu+ngakak';
            const { data } = await axios.get(apiUrl);

            if (!data.status || !data.result.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Tidak ada meme ditemukan.'
                });
            }

            const memes = data.result;
            const randomIndex = Math.floor(Math.random() * memes.length);
            const meme = memes[randomIndex];

            if (!meme.image_url) {
                return res.status(404).json({
                    success: false,
                    message: 'error.'
                });
            }
            const response = await axios.get(meme.image_url, { responseType: 'stream' });
            res.setHeader('Content-Type', response.headers['content-type'] || 'image/jpeg');
            response.data.pipe(res);

        } catch (err) {
            console.error('❌ Error:', err.message);
            res.status(500).json({
                success: false,
                message: 'error.'
            });
        }
    });
};