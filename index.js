const express = require('express');
const app = express();
const port = 3006;

app.get('/', (req, res) => {
  res.send('Buggy App is running on port 3002. Try the /api/slow or /api/buggy endpoints.');
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

// Endpoint causing runtime error (buggy)
app.get('/api/buggy', (req, res) => {
  console.log(`[${new Date().toISOString()}] Received request for /api/buggy, triggering an error...`);
  
  // Deliberate bug: Cannot read properties of undefined
  let user = undefined;
  
  res.json({
    name: user.name 
  });
});

app.listen(port, () => {
  console.log(`Buggy app listening on port ${port}`);
});
