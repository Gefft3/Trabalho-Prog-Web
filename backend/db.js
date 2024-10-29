const { Pool } = require('pg');
require('dotenv').config(); 

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("funciona caraio");
        client.release(); 
    } catch (err) {
        console.error("erro", err);
    }
};


testConnection();
