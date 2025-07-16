module.exports = function(app) {
    async function loli() {
        try {
            const data = await fetchJson(`https://raw.githubusercontent.com/rynxzyy/loli-r-img/refs/heads/main/links.json`)
            const response = await getBuffer(data[Math.floor(data.length * Math.random())])
            return response
        } catch (error) {
            throw error;
        }
    }
    app.get('/random/loli', async (req, res) => {
       const { apikey, pedo } = req.query;
       const check = global.apikey
       if (!global.apikey.includes(apikey)) return res.json("Apikey valid.")
        try {
            const pedo = await loli();
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': pedo.length,
            });
            res.end(pedo);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};