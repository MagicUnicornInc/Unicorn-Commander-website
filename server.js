import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import basicAuth from 'express-basic-auth';

const app = express();
app.use(express.json());
app.use(cors());

// Basic Auth configuration
const auth = basicAuth({
  users: { admin: process.env.ADMIN_PASSWORD || 'unicorn123' },
  challenge: true,
  realm: 'Unicorn Commander Admin'
});

// Initialize SQLite database
const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

// Create tables if they don't exist
async function initializeDatabase() {
  const db = await dbPromise;
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      betaTester BOOLEAN,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS preorders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stripeSessionId TEXT UNIQUE,
      email TEXT,
      amount INTEGER,
      status TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

initializeDatabase().catch(console.error);

// Endpoint to handle waitlist signups
app.post('/api/waitlist', async (req, res) => {
  try {
    const db = await dbPromise;
    const { email, betaTester } = req.body;
    
    await db.run(
      'INSERT INTO waitlist (email, betaTester) VALUES (?, ?)',
      [email, betaTester || false]
    );
    
    res.json({ success: true });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ error: 'Email already registered' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Admin endpoint to view waitlist
app.get('/api/admin/waitlist', auth, async (req, res) => {
  try {
    const db = await dbPromise;
    const waitlist = await db.all('SELECT * FROM waitlist ORDER BY createdAt DESC');
    res.json(waitlist);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin endpoint to download waitlist as CSV
app.get('/api/admin/waitlist.csv', auth, async (req, res) => {
  try {
    const db = await dbPromise;
    const waitlist = await db.all('SELECT * FROM waitlist ORDER BY createdAt DESC');
    
    let csv = 'ID,Email,Beta Tester,Created At\n';
    waitlist.forEach(entry => {
      csv += `${entry.id},${entry.email},${entry.betaTester ? 'Yes' : 'No'},"${entry.createdAt}"\n`;
    });
    
    res.header('Content-Type', 'text/csv');
    res.attachment('waitlist.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Other existing endpoints remain the same
// ...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Admin interface available at http://localhost:${port}/admin`);
});
