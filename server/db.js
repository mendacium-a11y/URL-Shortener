import sqlite3 from 'sqlite3'
import 'dotenv/config'

const DB_PATH = (process.env.NODE_ENV === 'production' ? ':memory:' : './database.sqlite')

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Database connection error:', err.message)
    } else {
        console.log('Connected to the SQLite database.')
    }
})

export const setUp = () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS links (
        Key TEXT PRIMARY KEY,
        Url TEXT NOT NULL
    )`

    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err)
        } else {
            console.log('Table created successfully')
        }
    });

    db.run(createUsersTable, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created successfully.');
        }
    });
};

export const insertLink = (url) => {
    try {
        const urlRegex = /^(https?):\/\/(www\.)?([a-zA-Z0-9\-.]+\.)([a-zA-Z0-9-.]+)\/?([a-zA-z0-9\/?=%&-]+)?$/
        const result = urlRegex.test(url)

        if (result) {
            const key = Math.random().toString(36).slice(2, 8)
            const sqlQuery = 'INSERT INTO links (Key, Url) VALUES (?, ?)'
            db.run(sqlQuery, [key, url], function (err) {
                if (err) {
                    return console.error(err.message)
                }
                console.log(`A row has been inserted with key ${key}`)
            })
            return key
        } else {
            throw new Error('invalid url')
        }
    } catch (error) {
        console.error(error)
    }
}
export const query = async (key) => {
    try {
        const keyRegex = /^[a-zA-Z0-9]{6}$/

        if (!keyRegex.test(key)) {
            throw new Error('Invalid key')
        }

        const sqlQuery = 'SELECT * FROM links WHERE key = ?'
        const row = await new Promise((resolve, reject) => {
            db.get(sqlQuery, [key], (err, row) => {
                if (err) {
                    reject(err)
                    return console.error(err.message)
                }
                if (row) {
                    resolve(row.Url)
                } else {
                    resolve(null)
                }
            })
        })
        return row
    } catch (error) {
        console.error(error)
    }
}
export const createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.run(sqlQuery, [username, email, password], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

export const getUser = (email) => {
        return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM users WHERE email = ?';
        db.get(sqlQuery, [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row || null);
            }
        });
    });
};

export const shutDown = () => db.close();

setUp();
