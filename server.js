const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let DBstorage = [];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/add', (req, res) => {
    const { name, password } = req.body;
    DBstorage.push({ name, password });
    res.json(DBstorage);
    console.log(DBstorage);
});

app.post('/delete', (req, res) => {
    const { name } = req.body;
    DBstorage = DBstorage.filter(item => item.name !== name);
    res.json(DBstorage); // Send the updated DBstorage back
    console.log(DBstorage);
});

app.listen(3000, () => {
    console.log("Server is up! on port 3000");
});
