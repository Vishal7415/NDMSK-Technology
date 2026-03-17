const express = require('express');
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
async function connectDB() {
    try {
        db = await open({
            filename: './database.sqlite',
            driver: sqlite3.Database
        });

        // Initialize table if it doesn't exist
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
        console.log('SQLite Database connected and table verified');
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
}
connectDB();

// API Routes

// 1. Get stats
app.get('/api/stats', async (req, res) => {
    try {
        const total = await db.get('SELECT COUNT(*) as count FROM job_applications');
        const recent = await db.get("SELECT COUNT(*) as count FROM job_applications WHERE created_at >= datetime('now', '-1 day')");
        const byJob = await db.all('SELECT job_title, COUNT(*) as count FROM job_applications GROUP BY job_title');
        
        res.json({
            total: total.count,
            recent: recent.count,
            byJob: byJob
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Get applications
app.get('/api/applications', async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM job_applications ORDER BY created_at DESC');
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

        const result = await db.run(
            'INSERT INTO job_applications (full_name, email, portfolio, job_title, resume, resume_name) VALUES (?, ?, ?, ?, ?, ?)',
            [fullname, email, portfolio, jobTitle, resume, resumeName]
        );

        res.status(201).json({ message: 'Application submitted successfully', id: result.lastID });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// 4. Download resume
app.get('/api/resume', async (req, res) => {
    try {
        const { id } = req.query;
        const row = await db.get('SELECT resume, resume_name FROM job_applications WHERE id = ?', [id]);
        
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
        await db.run('DELETE FROM job_applications WHERE id = ?', [id]);
        res.json({ message: 'Application deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// For any other page, check if HTML exists (support extension-less and with extension)
app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    if (page.includes('.')) return next(); // Let express.static handle files with extensions
    
    const filePath = path.join(__dirname, page + '.html');
    res.sendFile(filePath, (err) => {
        if (err) next();
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
