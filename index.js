const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Ruta para obtener datos del clima
app.get('/clima', async (req, res) => {
try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=4.6097&lon=-74.0817&appid=710f1f613ca801ab2476006f74a4ccf0');
    const climaData = response.data;
    res.json(climaData);
} catch (error) {
    res.status(500).json({ error: 'Error al obtener datos del clima' });
}
});

// Ruta para obtener datos de noticias
app.get('/noticias', async (req, res) => {
const newsApiUrl = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=339006c22dfd461aa1641bbbc9d59ce7';

async function getData() {
    try {
    const response = await axios.get(newsApiUrl);
    return response.data;
    } catch (error) {
    console.error('Error al obtener datos de noticias:', error);
    return null;
    }
}

try {
    const noticiasData = await getData();

    if (!noticiasData) {
    res.status(500).json({ error: 'Error al obtener datos de noticias' });
    return;
    }

    const noticiasEspecificas = noticiasData.articles.filter(noticia => {
    return noticia.title === 'Solar Woes Deepen After Enphase Stock Plunges to Three-Year Low'; 
    });

    if (noticiasEspecificas.length > 0) {
    res.json(noticiasEspecificas[0]); 
    } else {
    res.status(404).json({ error: 'No se encontraron noticias específicas' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error en la solicitud de noticias' });
}
});

// Ruta para combinar datos de clima y noticias
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








