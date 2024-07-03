const express = require("express");
const bodyparser = require("body-parser")

let app = express();

app.use(express.static(__dirname));
app.use(bodyparser.json());

app.get("/user", (req, res) => {
    res.json(req.query);
})

app.delete("/user", (req, res) => {
    res.json(req.query);
})
app.head("/user", (req, res) => {
    res.json();
})
app.post("/user", (req, res) => {
    res.json(req.body);
})
app.put("/user", (req, res) => {
    res.json(req.body);
})
app.patch("/user", (req, res) => {
    res.json(req.body);
})
app.listen(8989);