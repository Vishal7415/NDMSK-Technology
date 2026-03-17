// NDMSK Technology Server
const express = require('express');
const { Pool } = require('pg');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Multer setup for resume uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Database connection
let db;
const isProduction = process.env.NODE_ENV === 'production';
const usePostgres = !!process.env.DATABASE_URL;

async function initDB() {
    try {
        if (usePostgres) {
            db = new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: isProduction ? { rejectUnauthorized: false } : false
            });
            
            await db.query(`
                CREATE TABLE IF NOT EXISTS job_applications (
                    id SERIAL PRIMARY KEY,
                    full_name TEXT,
                    email TEXT,
                    portfolio TEXT,
                    job_title TEXT,
                    resume BYTEA,
                    resume_name TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('PostgreSQL Database connected');
        } else {
            db = await open({
                filename: path.join(__dirname, 'database.sqlite'),
                driver: sqlite3.Database
            });
            
            await db.exec(`
                CREATE TABLE IF NOT EXISTS job_applications (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    full_name TEXT,
                    email TEXT,
                    portfolio TEXT,
                    job_title TEXT,
                    resume BLOB,
                    resume_name TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('SQLite Database connected (Local/cPanel)');
        }
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
}
initDB();

// API Routes

// Helper to run queries (Postgres vs SQLite abstraction)
async function query(text, params) {
    if (usePostgres) {
        const res = await db.query(text, params);
        return { rows: res.rows, rowCount: res.rowCount };
    } else {
        // Convert $1, $2 to ? for SQLite
        const sqliteText = text.replace(/\$(\d+)/g, '?');
        if (text.trim().toUpperCase().startsWith('SELECT')) {
            const rows = await db.all(sqliteText, params);
            return { rows, rowCount: rows.length };
        } else {
            const result = await db.run(sqliteText, params);
            return { rows: [], rowCount: result.changes, lastID: result.lastID };
        }
    }
}

// 1. Get stats
app.get('/api/stats', async (req, res) => {
    try {
        const totalResult = await query('SELECT COUNT(*) as count FROM job_applications');
        const recentResult = await query("SELECT COUNT(*) as count FROM job_applications WHERE created_at >= " + (usePostgres ? "NOW() - INTERVAL '1 day'" : "datetime('now', '-1 day')"));
        const byJobResult = await query('SELECT job_title, COUNT(*) as count FROM job_applications GROUP BY job_title');
        
        res.json({
            total: parseInt(totalResult.rows[0].count),
            recent: parseInt(recentResult.rows[0].count),
            byJob: byJobResult.rows
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Get applications
app.get('/api/applications', async (req, res) => {
    try {
        const { rows } = await query('SELECT * FROM job_applications ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Post application
app.post('/api/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullname, email, portfolio, jobTitle } = req.body;
        const resume = req.file ? req.file.buffer : null;
        const resumeName = req.file ? req.file.originalname : null;

        const result = await query(
            'INSERT INTO job_applications (full_name, email, portfolio, job_title, resume, resume_name) VALUES ($1, $2, $3, $4, $5, $6)' + (usePostgres ? ' RETURNING id' : ''),
            [fullname, email, portfolio, jobTitle, resume, resumeName]
        );

        res.status(201).json({ message: 'Application submitted successfully', id: usePostgres ? result.rows[0].id : result.lastID });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// 4. Download resume
app.get('/api/resume', async (req, res) => {
    try {
        const { id } = req.query;
        const { rows } = await query('SELECT resume, resume_name FROM job_applications WHERE id = $1', [id]);
        const row = rows[0];
        
        if (!row || !row.resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${row.resume_name || 'resume.pdf'}"`);
        res.send(row.resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. Delete application
app.delete('/api/applications', async (req, res) => {
    try {
        const { id } = req.query;
        await query('DELETE FROM job_applications WHERE id = $1', [id]);
        res.json({ message: 'Application deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// For any other page, check if HTML exists
app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    if (page.includes('.')) return next();
    
    const filePath = path.join(__dirname, page + '.html');
    res.sendFile(filePath, (err) => {
        if (err) next();
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
