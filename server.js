import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Initialize SQLite database
const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

// Create tables if they don't exist
async function initializeDatabase() {
  const db = await dbPromise;
  
  // Table for waitlist entries
  await db.exec(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      betaTester BOOLEAN,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Table for pre-orders
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
      [email, betaTester]
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

// Endpoint to get remaining pre-order count
app.get('/api/preorders/remaining', async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.get(
      'SELECT COUNT(*) as count FROM preorders WHERE status = "completed"'
    );
    
    const totalPreorders = result.count;
    const remainingUnits = 500 - totalPreorders;
    
    res.json({ remaining: Math.max(0, remainingUnits) });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to get claimed units in the last 24 hours
app.get('/api/preorders/claimed-today', async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.get(
      "SELECT COUNT(*) as count FROM preorders WHERE status = 'completed' AND createdAt >= datetime('now', '-24 hours')"
    );

    const claimedToday = result.count;
    res.json({ claimedToday });
  } catch (error) {
    console.error('Error fetching claimed today:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to handle Stripe webhook
app.post('/api/stripe-webhook', async (req, res) => {
  const event = req.body;

  try {
    const db = await dbPromise;
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      await db.run(
        'INSERT INTO preorders (stripeSessionId, email, amount, status) VALUES (?, ?, ?, ?)',
        [session.id, session.customer_email, session.amount_total, 'completed']
      );
    }
    
    res.json({ received: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
