import express from 'express';
import "dotenv/config";
const app = express();
const port = 3006;

app.get('/', (req, res) => {
  res.send('Buggy App is running on port 3006. Try the /api/slow or /api/buggy endpoints.');
});

// High latency endpoint
app.get('/api/slow', (req, res) => {
  const delay = 10000; // 10 seconds latency
  console.log(`[${new Date().toISOString()}] Received request for /api/slow, delaying for ${delay}ms...`);
  
  setTimeout(() => {
    res.json({
      success: true,
      message: 'This data was delayed due to high latency implementation.',
      latency: delay
    });
  }, delay);
});



app.get('/api/get-weather', async (req, res) => {
  try {

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    console.log(apiKey);

    const response = await fetch(
      'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=YOUR_API_KEY'
    );

    const weatherData = await response.json();

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Buggy app listening on port ${port}`);
});
