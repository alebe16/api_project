const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;


app.get('/clima', async (req, res) => {
try {

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=4.6097&lon=-74.0817&appid=710f1f613ca801ab2476006f74a4ccf0');
    const climaData = response.data;
    res.json(climaData);
} catch (error) {
    res.status(500).json({ error: 'Error al obtener datos del clima' });
}
});

app.get('/noticias', async (req, res) => {
try {
    
    const response = await axios.get('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=339006c22dfd461aa1641bbbc9d59ce7');
    const noticiasData = response.data;
    res.json(noticiasData);
} catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de noticias' });
}
});


app.get('/clima-noticias', async (req, res) => {
try {

    const climaResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=4.6097&lon=-74.0817&appid=710f1f613ca801ab2476006f74a4ccf0');
    const noticiasResponse = await axios.get('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=339006c22dfd461aa1641bbbc9d59ce7');

    const climaData = climaResponse.data;
    const noticiasData = noticiasResponse.data;

    
    const datosCombinados = {
    clima: climaData,
    noticias: noticiasData,
    };

    res.json(datosCombinados);
} catch (error) {
    res.status(500).json({ error: 'Error al obtener datos' });
}
});

app.listen(port, () => {
console.log(`La API está escuchando en el puerto ${port}`);
});






