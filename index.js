const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta para obtener datos de terremotos
app.get('/earthquakes', async (req, res) => {
    try {
        const response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
        const earthquakes = response.data.features.filter(eq => {
            const eventDate = new Date(eq.properties.time);
            const today = new Date();
            return eventDate.toDateString() === today.toDateString();
        });
        res.json(earthquakes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos de terremotos');
    }
});

app.use(express.static('public'));

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
