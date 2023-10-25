import express from "express";

const app = express();


app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html");
});
app.get("/2", (req, res) => {
    res.status(200).sendFile(__dirname + "/page2.html");
})
app.get("/conjugator.js", (req, res) => {
    res.status(200).sendFile(__dirname + "/conjugator.js");
})

app.listen(8000);