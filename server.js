const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test route to check if backend works
app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});

// Example API route for pothole report
app.post('/report', (req, res) => {
  const { description, lat, lng } = req.body;

  if (!description || lat == null || lng == null) {
    return res.status(400).json({ error: 'Missing description, lat, or lng' });
  }

  res.json({
    message: 'Pothole report received successfully!',
    data: { description, lat, lng }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
