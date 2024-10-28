const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables
console.log('DATABASE_URL:', process.env.DATABASE_URL); 
// Connect to PostgreSQL using DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = pool;

