// TRANS RIGHTS
import express from "express";
const app = express();

import { conjugateJapanese } from "./server/japaneseConj/japaneseConjugatorServer.js";

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/index.html");
});
app.get("/spanishConj", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/spanishConjugator.html");
})
app.get("/spanishConjugator.js", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/spanishConjugator.js");
})
app.get("/index.css", (req, res) => {
    res.status(200).sendFile(__dirname + "/client/index.css");
})
app.get("/japaneseConj", (req, res) => { 
    res.status(200).sendFile(__dirname + "/client/japaneseConjugator.html");
})
app.get("/japaneseConjugator.js", (req, res) => { 
    res.status(200).sendFile(__dirname + "/client/japaneseConjugator.js");
})
app.get("/conjugateJapaneseServer", (req, res) => {
    let root = req.query.root;
    let conjOption = req.query.conjOption;
    let verPosorNeg = req.query.verPosorNeg;
  
    let conjugatedVerb = conjugateJapanese(root, conjOption, verPosorNeg);
  
    res.status(200).send(conjugatedVerb);
  });
    
app.listen(8000);