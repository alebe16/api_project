const express = require('express');
const app = express();

app.use(express.json());

const weather = [
    { id: 1, city: 'Bogota', temperature: 11, worse: true },
    { id: 2, city: 'Barranquilla', temperature: 32, worse: false }
];

const news = [
    { id: 1, headline: 'News 1', content: 'Worse weather in this city' },
    { id: 2, headline: 'News 2', content: 'Good weather in this city' }
];

app.get('/', (req, res) => {
    res.send('Node JS API');
});

app.get('/api/weather', (req, res) => {
    res.json(weather);
});

app.get('/api/news', (req, res) => {
    res.json(news);
});

app.get('/api/weather-news', (req, res) => {
    const combinedData = {
        weather: weather,
        news: news
    };
    res.json(combinedData);
});

app.listen(3000, () => {
    console.log('API escuchando en el puerto 3000');
});





