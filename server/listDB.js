import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');

/***
 * This script lists all tables in the database and then fetches all data from each table.
 * 
 * usage example:
 *      node listDB.js
 * 
 */

db.serialize(() => {
    console.log('Listing all tables:');
    db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
        if (err) {
            console.error(err.message);
            return;
        }

        console.log(tables);

        // Use Promise to handle asynchronous queries
        const tablePromises = tables.map(table => {
            const tableName = table.name;

            return new Promise((resolve, reject) => {
                console.log(`Data from table: ${tableName}`);
                db.all(`SELECT * FROM ${tableName};`, (err, rows) => {
                    if (err) {
                        console.error(`Error querying table ${tableName}:`, err.message);
                        reject(err);
                    } else {
                        console.log(`Rows from ${tableName}:`, rows);
                        resolve(rows);
                    }
                });
            });
        });

        // Wait for all table data queries to complete
        Promise.all(tablePromises)
            .then(() => {
                console.log('All table data fetched.');
                db.close((err) => {
                    if (err) {
                        console.error('Error closing the database:', err.message);
                    } else {
                        console.log('Database connection closed.');
                    }
                });
            })
            .catch((err) => {
                console.error('Error fetching table data:', err.message);
                db.close();
            });
    });
});
