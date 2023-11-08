const express = require('express');
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'nodedb',
    password: 'nodedb',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sqlc = `CREATE TABLE IF NOT EXISTS people(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255))`;
connection.query(sqlc, function (err, result) {
    if (err) throw err;
    console.log("Table Ok.");

    const sql = `INSERT INTO people(name) values('JWRibas')`;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Insert Ok.");
    });
});

app.get('/', (req, res) => {
    const sqlr = `SELECT name FROM people`;

    connection.query(sqlr, function (err, result) {
        if (err) throw err;

        const names = result.map(row => `<li>${row.name}</li>`).join('');

        res.send(`<h1>Full Cycle Rocks!</h1>
                    <h2>Nomes cadastrados no banco de dados:</h2>
                    <ul>${names}</ul>`);

        //connection.end();
    });
});

app.listen(port, '0.0.0.0',() => {
    console.log(`Listening at ${port}`)
})