// TRANS RIGHTS
import express from "express";
const app = express();
let option = "masu";
let tense = 2;
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
    let root = req.query.root as string;
    let verPosorNeg = req.query.verPosorNeg == "true";
    let tense = req.query.tense as string;
    let tenseNum = parseInt(tense);
    let conjugatedVerb = conjugateJapanese(root, option, verPosorNeg, tenseNum);
  
    res.status(200).send(conjugatedVerb);
});
app.get("/changeJapaneseConjOption", (req, res) => {
    option = req.query.option as string;
    console.log("option = " + option);
    res.status(200).sendFile(__dirname + "/client/japaneseConjugator.html");
});
app.get("/changeJapaneseTense", (req, res) => {
    tense = parseInt(req.query.tense as string);
    console.log("tense = " + tense);
    res.status(200).sendFile(__dirname + "/client/japaneseConjugator.html");
});
app.listen(8000);