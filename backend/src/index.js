const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration
const corsOptions = {
  origin: 'https://6z5p7y-3000.csb.app',
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse incoming JSON requests
app.use('/api', taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

